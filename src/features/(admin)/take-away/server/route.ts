import { db } from '@/database/db';
import { takeAway as TakeAwayTable } from '@/database/schema/takeaway';
import { dateRangeSchema } from '@/features/(owner)/dashboard/schemas';
import { mapHistoryDateToRecord } from '@/services/mapHistoryDateToRecord';
import { getCurrentUser } from '@/services/middleware-hono';
import { zValidator } from '@hono/zod-validator';
import { and, desc, gte, lte } from 'drizzle-orm';
import { Hono } from 'hono';
import { insertTakeAwaySchema } from '../schemas';

//tables

const app = new Hono()
    .get(
        '/history',
        getCurrentUser,
        zValidator('query', dateRangeSchema),
        async c => {
            const user = c.get('user');

            if (!user) {
                return c.json({ message: 'Unauthorized' }, 401);
            }

            try {
                const { startDate, endDate } = c.req.query();
                const start = new Date(startDate);
                const end = new Date(endDate);
                end.setDate(end.getDate() + 1);

                const takeAwayHistory = await db
                    .select()
                    .from(TakeAwayTable)
                    .where(
                        and(
                            gte(TakeAwayTable.updatedAt, start),
                            lte(TakeAwayTable.updatedAt, end)
                        )
                    )
                    .orderBy(desc(TakeAwayTable.updatedAt));

                if (takeAwayHistory.length === 0) {
                    return c.json(
                        { message: 'No take away history', result: [] },
                        404
                    );
                }

                const formattedTakeAwayHistory = takeAwayHistory.map(item => ({
                    id: item.id,
                    totalAmount: item.totalAmount,
                    paymentMethod: item.paymentMethod,
                    updatedAt: item.updatedAt.toISOString(),
                }));

                const groupedTakeAwayHistory = mapHistoryDateToRecord(
                    formattedTakeAwayHistory
                );

                return c.json(
                    {
                        message: 'Take away history',
                        result: groupedTakeAwayHistory,
                    },
                    200
                );
            } catch (error) {
                console.log(error);
                return c.json({ message: 'Internal server error' }, 500);
            }
        }
    )
    .post(
        '/create-take-away',
        getCurrentUser,
        zValidator('form', insertTakeAwaySchema),
        async c => {
            const user = c.get('user');

            if (!user) {
                return c.json({ message: 'Unauthorized' }, 401);
            }

            try {
                const { totalPrice, paymentMethod } = c.req.valid('form');

                await db.insert(TakeAwayTable).values({
                    totalAmount: totalPrice,
                    paymentMethod,
                });

                return c.json(
                    { message: 'Take away created successfully' },
                    200
                );
            } catch (error) {
                console.log(error);
                return c.json({ message: 'Internal server error' }, 500);
            }
        }
    );

export default app;
