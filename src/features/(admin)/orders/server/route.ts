import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { getCurrentUser } from '@/services/middleware-hono';

import { db } from '@/database/db';
import { and, asc, eq, isNull, sql } from 'drizzle-orm';
import z from 'zod';
import { insertOrderSchema } from '../schemas';

import { product as ProductTable } from '@/database/schema/product';
import { activeInfo as ActiveInfoTable } from '@/database/schema/active';
import {
    order as OrderTable,
    orderItem as OrderItemTable,
} from '@/database/schema/order';
import { OrderItem } from '../types';

const app = new Hono()
    .get('/product-drink-list', getCurrentUser, async c => {
        const user = c.get('user');

        if (!user) {
            return c.json({ error: 'Unauthorized' }, 401);
        }

        try {
            const drinkList = await db
                .select({
                    id: ProductTable.id,
                    name: ProductTable.name,
                    stock: ProductTable.stock,
                    unit: ProductTable.unit,
                    price: ProductTable.price,
                    image: ProductTable.image,
                })
                .from(ProductTable)
                .where(
                    and(
                        eq(ProductTable.category, 'เครื่องดื่ม'),
                        isNull(ProductTable.deletedAt)
                    )
                )
                .orderBy(asc(ProductTable.name));

            return c.json({ message: 'success', result: drinkList }, 200);
        } catch (error) {
            console.log(error);
            return c.json({ error: 'Internal server error' }, 500);
        }
    })
    .get(
        '/get-activeInfo-tableNumber/:activeInfoId',
        getCurrentUser,
        zValidator(
            'param',
            z.object({
                activeInfoId: z.string(),
            })
        ),
        async c => {
            const user = c.get('user');

            if (!user) {
                return c.json({ error: 'Unauthorized' }, 401);
            }

            try {
                const activeInfoId = c.req.param('activeInfoId');

                const activeInfo = await db.query.activeInfo.findFirst({
                    columns: {
                        id: true,
                        tableId: true,
                    },
                    where: eq(ActiveInfoTable.id, activeInfoId ?? ''),
                    with: {
                        diningTable: {
                            columns: {
                                tableNumber: true,
                            },
                        },
                    },
                });

                return c.json({ message: 'success', result: activeInfo }, 200);
            } catch (error) {
                console.log(error);
                return c.json({ error: 'Internal server error' }, 500);
            }
        }
    )
    .get('/order-history/:activeInfoId', getCurrentUser, async c => {
        const user = c.get('user');

        if (!user) {
            return c.json({ error: 'Unauthorized' }, 401);
        }

        try {
            const activeInfoId = c.req.param('activeInfoId');

            const orders = await db.query.order.findMany({
                where: eq(OrderTable.activeInfoId, activeInfoId),
                columns: {
                    id: true,
                    totalPrice: true,
                    updatedAt: true,
                },
                with: {
                    orderItems: {
                        columns: {
                            id: true,
                            orderId: true,
                            productId: true,
                            quantity: true,
                            pricePerUnit: true,
                        },
                        with: {
                            product: {
                                columns: {
                                    name: true,
                                },
                            },
                        },
                    },
                },
            });

            const formattedOrders = orders.map(order => ({
                id: order.id,
                totalPrice: order.totalPrice,
                updatedAt: order.updatedAt!,
                orderItems: order.orderItems.map(item => ({
                    id: item.id,
                    orderId: item.orderId,
                    productId: item.productId,
                    quantity: item.quantity,
                    pricePerUnit: item.pricePerUnit,
                    productName: item.product.name,
                })),
            }));

            return c.json({ message: 'success', result: formattedOrders }, 200);
        } catch (error) {
            console.log(error);
            return c.json({ error: 'Internal server error' }, 500);
        }
    })
    .post(
        '/create-order',
        getCurrentUser,
        zValidator('json', insertOrderSchema),
        async c => {
            const user = c.get('user');

            if (!user) {
                return c.json({ error: 'Unauthorized' }, 401);
            }

            try {
                const { activeInfoId, totalPrice, orderList } =
                    await c.req.json();

                await db.transaction(async tx => {
                    for (const item of orderList) {
                        await tx
                            .update(ProductTable)
                            .set({
                                stock: sql`${ProductTable.stock} - ${item.quantity}`,
                            })
                            .where(eq(ProductTable.id, item.product.id));
                    }

                    const [order] = await tx
                        .insert(OrderTable)
                        .values({
                            activeInfoId,
                            totalPrice,
                        })
                        .returning({
                            id: OrderTable.id,
                        });

                    await tx.insert(OrderItemTable).values(
                        orderList.map((item: OrderItem) => ({
                            orderId: order.id,
                            productId: item.product.id,
                            quantity: item.quantity,
                            pricePerUnit: item.product.price,
                        }))
                    );
                });

                return c.json({ message: 'create order successfully' }, 200);
            } catch (error) {
                console.log(error);
                return c.json({ error: 'Internal server error' }, 500);
            }
        }
    );

export default app;
