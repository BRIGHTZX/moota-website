import { db } from '@/database/db';
import { checkout } from '@/database/schema/checkout';
import { groupCheckoutByCreatedAt } from '@/services/groupCheckout';
import { mapHistoryDateToRecord } from '@/services/mapHistoryDateToRecord';
import { getCurrentUser } from '@/services/middleware-hono';
import { zValidator } from '@hono/zod-validator';
import { and, desc, eq, gte, lte } from 'drizzle-orm';
import { Hono } from 'hono';
import z from 'zod';

const app = new Hono()
    .get('/', getCurrentUser, async c => {
        const user = c.get('user');
        const isAdmin = c.get('isAdmin');

        if (!user) {
            return c.json({ message: 'Unauthorized' }, 401);
        }

        if (!isAdmin) {
            return c.json(
                { message: "You don't have permission to access" },
                403
            );
        }

        try {
            const { startDate, endDate } = await c.req.query();
            const start = new Date(startDate); // includes all time that day
            const end = new Date(endDate);
            end.setDate(end.getDate() + 1); // exclusive upper bound

            const checkoutHistory = await db.query.checkout.findMany({
                where: and(
                    gte(checkout.updatedAt, start),
                    lte(checkout.updatedAt, end)
                ),
                orderBy: desc(checkout.updatedAt),
                columns: {
                    id: true,
                    customerName: true,
                    paidAdultNumber: true,
                    paidChildNumber: true,
                    totalOrderPrice: true,
                    totalDiscount: true,
                    totalAmount: true,
                    updatedAt: true,
                },
            });

            const formattedCheckoutHistory = checkoutHistory.map(item => ({
                id: item.id,
                customerName: item.customerName,
                paidAdultNumber: item.paidAdultNumber,
                paidChildNumber: item.paidChildNumber,
                totalOrderPrice: item.totalOrderPrice,
                totalDiscount: item.totalDiscount,
                totalAmount: item.totalAmount,
                updatedAt: item.updatedAt.toISOString(),
            }));

            const groupByDate = mapHistoryDateToRecord(
                formattedCheckoutHistory
            );

            return c.json(
                {
                    message: 'fetch checkout history successfully',
                    result: groupByDate,
                },
                200
            );
        } catch (error) {
            console.error(error);
            return c.json({ message: 'Internal Server Error' }, 500);
        }
    })
    .get(
        '/:checkoutId',
        getCurrentUser,
        zValidator(
            'param',
            z.object({
                checkoutId: z.string(),
            })
        ),
        async c => {
            const user = c.get('user');
            const isAdmin = c.get('isAdmin');

            if (!user) {
                return c.json({ message: 'Unauthorized' }, 401);
            }

            if (!isAdmin) {
                return c.json(
                    { message: "You don't have permission to access" },
                    403
                );
            }

            try {
                const checkoutId = c.req.param('checkoutId');

                const checkoutList = await db.query.checkout.findFirst({
                    where: eq(checkout.id, checkoutId),
                    columns: {
                        id: true,
                        customerName: true,
                        paidAdultNumber: true,
                        paidChildNumber: true,
                        totalOrderPrice: true,
                        totalDiscount: true,
                        totalAmount: true,
                        updatedAt: true,
                    },
                    with: {
                        active: {
                            columns: {
                                status: true,
                            },
                        },
                        checkoutInfos: {
                            columns: {
                                id: true,
                                productId: true,
                                quantity: true,
                                pricePerUnit: true,
                                totalPrice: true,
                            },
                            with: {
                                product: {
                                    columns: {
                                        id: true,
                                        name: true,
                                    },
                                },
                            },
                        },
                        checkoutPaymentInfos: {
                            columns: {
                                groupType: true,
                                quantity: true,
                                pricePerUnit: true,
                                totalPrice: true,
                                paymentMethod: true,
                                createdAt: true,
                            },
                        },
                    },
                });

                const productMap = new Map();
                for (const item of checkoutList?.checkoutInfos ?? []) {
                    const { productId, quantity, pricePerUnit, product } = item;

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

                const groupedProductOrders = Array.from(productMap.values());

                const groupedPaymentInfos = groupCheckoutByCreatedAt(
                    checkoutList?.checkoutPaymentInfos ?? []
                );

                console.log(groupedPaymentInfos);

                const formattedCheckoutList = {
                    ...checkoutList,
                    checkoutInfos: groupedProductOrders,
                    checkoutPaymentInfos: groupedPaymentInfos,
                };

                return c.json(
                    {
                        message: 'fetch checkout list successfully',
                        result: formattedCheckoutList,
                    },
                    200
                );
            } catch (error) {
                console.error(error);
                return c.json({ message: 'Internal Server Error' }, 500);
            }
        }
    );

export default app;
