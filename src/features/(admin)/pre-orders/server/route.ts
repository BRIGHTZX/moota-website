import { db } from '@/database/db';
import { getCurrentUser } from '@/services/middleware-hono';
import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';

import {
    preOrder as PreOrderTable,
    preOrderInfo as PreOrderInfoTable,
} from '@/database/schema/pre-order';
import { diningTable as DiningTable } from '@/database/schema/diningTable';
import {
    active as ActiveTable,
    activeInfo as ActiveInfoTable,
} from '@/database/schema/active';
import { and, desc, eq, inArray } from 'drizzle-orm';

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
            const preOrders = await db.query.preOrder.findMany({
                where: and(
                    eq(PreOrderTable.status, 'pending'),
                    eq(PreOrderTable.paymentStatus, 'paid')
                ),
                columns: {
                    id: true,
                    preOrderNumber: true,
                    customerName: true,
                    phoneNumber: true,
                    adultNumber: true,
                    childNumber: true,
                    totalPrice: true,
                    reservationDate: true,
                    reservationTime: true,
                    status: true,
                    paymentStatus: true,
                    updatedAt: true,
                },
                with: {
                    preOrderInfo: {
                        columns: {
                            id: true,
                            tableId: true,
                        },
                        with: {
                            table: {
                                columns: {
                                    tableNumber: true,
                                },
                            },
                        },
                    },
                },
                orderBy: [desc(PreOrderTable.updatedAt)],
            });

            if (!preOrders.length) {
                return c.json(
                    { message: 'Reservation not found', result: [] },
                    200
                );
            }

            const formattedPreOrders = preOrders.map(preOrder => ({
                ...preOrder,
                tables: preOrder.preOrderInfo.map(info => ({
                    tableId: info.tableId,
                    tableNumber: info.table.tableNumber,
                })),
            }));

            return c.json(
                {
                    message: 'Reservation fetched successfully',
                    result: formattedPreOrders,
                },
                200
            );
        } catch (error) {
            console.error(error);
            return c.json({ message: 'Internal server error' }, 500);
        }
    })
    .get('/payment-image/:preOrderId', getCurrentUser, async c => {
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
            const preOrderId = c.req.param('preOrderId');

            const preOrder = await db.query.preOrder.findFirst({
                where: eq(PreOrderTable.id, preOrderId),
                columns: {
                    id: true,
                    paymentImage: true,
                    updatedAt: true,
                },
            });

            if (!preOrder) {
                return c.json({ message: 'Reservation not found' }, 404);
            }

            return c.json(
                {
                    message: 'Reservation fetched successfully',
                    result: preOrder,
                },
                200
            );
        } catch (error) {
            console.log(error);
            return c.json({ message: 'Internal server error', error }, 500);
        }
    })
    .post(
        '/create-active',
        getCurrentUser,
        zValidator(
            'json',
            z.object({
                preOrderId: z.string(),
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
                const { preOrderId } = c.req.valid('json');

                const result = await db.transaction(async tx => {
                    const [preOrder] = await tx
                        .select({
                            id: PreOrderTable.id,
                            customerName: PreOrderTable.customerName,
                            phoneNumber: PreOrderTable.phoneNumber,
                            adultNumber: PreOrderTable.adultNumber,
                            childNumber: PreOrderTable.childNumber,
                            reservationDate: PreOrderTable.reservationDate,
                            reservationTime: PreOrderTable.reservationTime,
                        })
                        .from(PreOrderTable)
                        .where(eq(PreOrderTable.id, preOrderId))
                        .limit(1);

                    if (!preOrder) {
                        throw new Error('Pre-order not found');
                    }

                    const preOrderInfo = await tx
                        .select({
                            id: PreOrderInfoTable.id,
                            tableId: PreOrderInfoTable.tableId,
                        })
                        .from(PreOrderInfoTable)
                        .where(eq(PreOrderInfoTable.preOrderId, preOrderId));

                    if (!preOrderInfo) {
                        throw new Error('Pre-order info not found');
                    }

                    const [active] = await tx
                        .insert(ActiveTable)
                        .values({
                            customerName: preOrder.customerName,
                            customerPhone: preOrder.phoneNumber,
                            openTime: preOrder.reservationTime,
                            adultNumber: preOrder.adultNumber,
                            childNumber: preOrder.childNumber,
                        })
                        .returning({
                            id: ActiveTable.id,
                        });

                    await tx.insert(ActiveInfoTable).values(
                        preOrderInfo.map(info => ({
                            activeId: active.id,
                            tableId: info.tableId,
                        }))
                    );

                    await tx
                        .update(DiningTable)
                        .set({
                            isAvailable: false,
                        })
                        .where(
                            inArray(
                                DiningTable.id,
                                preOrderInfo.map(info => info.tableId)
                            )
                        );

                    await tx
                        .update(PreOrderTable)
                        .set({
                            status: 'confirmed',
                        })
                        .where(eq(PreOrderTable.id, preOrderId));

                    return active;
                });

                return c.json(
                    { message: 'Active created successfully', result },
                    200
                );
            } catch (error) {
                console.log(error);
                return c.json({ message: 'Invalid request' }, 400);
            }
        }
    );

export default app;
