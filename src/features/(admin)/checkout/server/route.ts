import { getCurrentUser } from '@/services/middleware-hono';
import { Hono } from 'hono';

import { db } from '@/database/db';
import { zValidator } from '@hono/zod-validator';
import { and, eq, inArray, or, sql } from 'drizzle-orm';
import { getOrderListSchema, insertCheckoutSchema } from '../schemas';

import {
    activeInfo as ActiveInfoTable,
    active as ActiveTable,
} from '@/database/schema/active';
import {
    checkoutInfos as CheckoutInfosTable,
    checkout as CheckoutTable,
} from '@/database/schema/checkout';
import { diningTable as DiningTable } from '@/database/schema/diningTable';
import { order as OrderTable } from '@/database/schema/order';

const app = new Hono()
    .get('/checkout-info/:activeId', getCurrentUser, async c => {
        const user = c.get('user');
        const isAdmin = c.get('isAdmin');

        if (!user && !isAdmin) {
            return c.json({ message: 'Unauthorized' }, 401);
        }

        try {
            const activeId = c.req.param('activeId');

            const active = await db.query.active.findFirst({
                where: and(
                    eq(ActiveTable.id, activeId),
                    or(
                        eq(ActiveTable.status, 'open'),
                        eq(ActiveTable.status, 'partial')
                    )
                ),
                columns: {
                    id: true,
                    customerName: true,
                    customerPhone: true,
                    adultNumber: true,
                    childNumber: true,
                    status: true,
                    openTime: true,
                    updatedAt: true,
                },
                with: {
                    activeInfos: {
                        columns: {
                            id: true,
                            tableId: true,
                        },
                        with: {
                            diningTable: {
                                columns: {
                                    tableNumber: true,
                                },
                            },
                        },
                    },
                },
            });

            if (!active) {
                return c.json({ message: 'Active not found' }, 404);
            }

            const checkoutHistory = await db.query.checkout.findFirst({
                where: eq(CheckoutTable.activeId, activeId),
                columns: {
                    id: true,
                    paidAdultNumber: true,
                    paidChildNumber: true,
                },
            });

            const formattedActives = {
                ...active,
                activeInfos: active?.activeInfos.map(info => ({
                    activeInfoId: info.id,
                    tableId: info.tableId,
                    tableNumber: info.diningTable.tableNumber,
                })),
                checkoutHistory: checkoutHistory ? checkoutHistory : null,
            };

            return c.json({
                message: 'Fetch checkout info successfully',
                result: formattedActives,
            });
        } catch (error) {
            if (error instanceof Error) {
                console.log('error:', error.message);
            } else {
                console.log('error:', error);
            }
            return c.json({ message: 'Internal Server Error' }, 500);
        }
    })
    .post(
        '/get-order-lists',
        getCurrentUser,
        zValidator('json', getOrderListSchema),
        async c => {
            const user = c.get('user');
            const isAdmin = c.get('isAdmin');

            if (!user && !isAdmin) {
                return c.json({ message: 'Unauthorized' }, 401);
            }

            try {
                const { activeInfoId } = c.req.valid('json');

                const orderLists = await db.query.order.findMany({
                    where: inArray(OrderTable.activeInfoId, activeInfoId),
                    with: {
                        orderItems: {
                            with: {
                                product: true,
                            },
                        },
                    },
                });

                if (!orderLists.length) {
                    return c.json(
                        { message: 'Order not found', result: [] },
                        200
                    );
                }

                // Grouped Product Orders
                const productMap = new Map();
                for (const order of orderLists) {
                    for (const item of order.orderItems) {
                        const { productId, quantity, pricePerUnit, product } =
                            item;

                        if (!productMap.has(productId)) {
                            productMap.set(productId, {
                                productId,
                                productName: product.name.trim(),
                                pricePerUnit: pricePerUnit,
                                quantity: 0,
                                totalPrice: 0,
                            });
                        }

                        const current = productMap.get(productId);
                        current.quantity += quantity;
                        current.totalPrice += pricePerUnit * quantity;
                    }
                }

                const groupedProductOrders = Array.from(productMap.values());

                return c.json(
                    {
                        message: 'Fetch order list successfully',
                        result: groupedProductOrders,
                    },
                    200
                );
            } catch (error) {
                console.log(error);
                return c.json({ message: 'Internal Server Error' }, 500);
            }
        }
    )
    .post(
        '/checkout/:activeId',
        getCurrentUser,
        zValidator('json', insertCheckoutSchema),
        async c => {
            const user = c.get('user');
            const isAdmin = c.get('isAdmin');

            if (!user && !isAdmin) {
                return c.json({ message: 'Unauthorized' }, 401);
            }

            try {
                const { activeId } = c.req.param();
                const {
                    activeInfoId,
                    tableId,
                    customerName,
                    paidAdultNumber,
                    paidChildNumber,
                    totalOrderPrice,
                    totalDiscount,
                    totalAmount,
                    paymentMethod,
                    status,
                    orderList,
                } = c.req.valid('json');

                if (status !== 'partial' && status !== 'closed') {
                    return c.json({ message: 'Invalid status' }, 400);
                }

                const result = await db.transaction(async tx => {
                    let checkoutId = '';
                    // have checkout, update checkout
                    const isExistCheckout = await tx.query.checkout.findFirst({
                        where: eq(CheckoutTable.activeId, activeId),
                        columns: {
                            id: true,
                        },
                    });

                    if (isExistCheckout) {
                        checkoutId = isExistCheckout.id;

                        await tx
                            .update(CheckoutTable)
                            .set({
                                paidAdultNumber: sql`${
                                    CheckoutTable.paidAdultNumber
                                } + ${Number(paidAdultNumber)}`,
                                paidChildNumber: sql`${
                                    CheckoutTable.paidChildNumber
                                } + ${Number(paidChildNumber)}`,
                                totalOrderPrice: sql`${
                                    CheckoutTable.totalOrderPrice
                                } + ${Number(totalOrderPrice)}`,
                                totalDiscount: sql`${
                                    CheckoutTable.totalDiscount
                                } + ${Number(totalDiscount)}`,
                                totalAmount: sql`${
                                    CheckoutTable.totalAmount
                                } + ${Number(totalAmount)}`,
                                paymentMethod,
                            })
                            .where(eq(CheckoutTable.id, checkoutId));
                    } else {
                        // If didn't have checkout, create checkout
                        const [newCheckout] = await tx
                            .insert(CheckoutTable)
                            .values({
                                activeId,
                                customerName,
                                paidAdultNumber: Number(paidAdultNumber),
                                paidChildNumber: Number(paidChildNumber),
                                totalOrderPrice: Number(totalOrderPrice),
                                totalDiscount: Number(totalDiscount),
                                totalAmount: Number(totalAmount),
                                paymentMethod,
                            })
                            .returning({ id: CheckoutTable.id });

                        checkoutId = newCheckout.id;
                    }

                    if (orderList.length !== 0) {
                        await tx.insert(CheckoutInfosTable).values(
                            orderList.map(item => ({
                                checkoutId: checkoutId,
                                productId: item.productId,
                                quantity: Number(item.quantity),
                                pricePerUnit: Number(item.pricePerUnit),
                                totalPrice: Number(item.totalPrice),
                            }))
                        );
                    }

                    await tx
                        .update(DiningTable)
                        .set({
                            isAvailable: true,
                        })
                        .where(inArray(DiningTable.id, tableId));

                    await tx
                        .delete(ActiveInfoTable)
                        .where(inArray(ActiveInfoTable.id, activeInfoId));

                    await tx
                        .update(ActiveTable)
                        .set({
                            status: status,
                        })
                        .where(eq(ActiveTable.id, activeId));

                    return checkoutId;
                });

                if (status === 'closed') {
                    await db
                        .update(ActiveTable)
                        .set({
                            status: 'closed',
                        })
                        .where(eq(ActiveTable.id, activeId));

                    return c.json(
                        {
                            message: 'Checkout successfully closed',
                            activeSuccess: true,
                            checkoutId: result,
                        },
                        200
                    );
                }

                return c.json(
                    {
                        message: 'Create checkout successfully',
                        activeSuccess: false,
                        checkoutId: result,
                    },
                    200
                );
            } catch (error) {
                console.log(error);
                return c.json({ message: 'Internal Server Error' }, 500);
            }
        }
    );

export default app;
