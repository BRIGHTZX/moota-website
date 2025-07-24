import { db } from '@/database/db';
import { getCurrentUser } from '@/services/middleware-hono';
import { desc, eq, inArray, or } from 'drizzle-orm';
import { Hono } from 'hono';

import {
    activeInfo as ActiveInfoTable,
    active as ActiveTable,
} from '@/database/schema/active';
import { zValidator } from '@hono/zod-validator';
import z from 'zod';
import { diningTable as DiningTable } from '@/database/schema/diningTable';

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
            const actives = await db.query.active.findMany({
                where: or(
                    eq(ActiveTable.status, 'open'),
                    eq(ActiveTable.status, 'partial')
                ),
                orderBy: [desc(ActiveTable.updatedAt)],
                columns: {
                    id: true,
                    customerName: true,
                    customerPhone: true,
                    adultNumber: true,
                    childNumber: true,
                    openTime: true,
                    updatedAt: true,
                    status: true,
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

            if (!actives.length) {
                return c.json(
                    { message: 'Actives not found', result: [] },
                    200
                );
            }

            const formattedActives = actives.map(active => ({
                activeId: active.id,
                customerName: active.customerName,
                customerPhone: active.customerPhone,
                adultNumber: active.adultNumber,
                childNumber: active.childNumber,
                openTime: active.openTime,
                updatedAt: active.updatedAt,
                activeInfos: active.activeInfos.map(info => ({
                    activeInfoId: info.id,
                    tableId: info.tableId,
                    tableNumber: info.diningTable.tableNumber,
                })),
            }));

            return c.json({
                message: 'Actives fetched successfully',
                result: formattedActives,
            });
        } catch (error) {
            console.log(error);
            return c.json({ message: 'Internal server error' }, 500);
        }
    })
    .post(
        '/cancel-active',
        getCurrentUser,
        zValidator(
            'json',
            z.object({
                activeId: z.string(),
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
                const { activeId } = c.req.valid('json');

                await db.transaction(async tx => {
                    const activeInfo = await tx
                        .select({
                            activeInfoId: ActiveInfoTable.id,
                            tableId: ActiveInfoTable.tableId,
                        })
                        .from(ActiveInfoTable)
                        .where(eq(ActiveInfoTable.activeId, activeId));

                    if (!activeInfo) {
                        throw new Error('Active info not found');
                    }

                    await tx
                        .update(DiningTable)
                        .set({
                            isAvailable: true,
                        })
                        .where(
                            inArray(
                                DiningTable.id,
                                activeInfo.map(info => info.tableId)
                            )
                        );

                    await tx
                        .delete(ActiveTable)
                        .where(eq(ActiveTable.id, activeId));
                });

                return c.json({ message: 'Active canceled successfully' }, 200);
            } catch (error) {
                console.log(error);
                return c.json({ message: 'Internal server error' }, 500);
            }
        }
    );
export default app;
