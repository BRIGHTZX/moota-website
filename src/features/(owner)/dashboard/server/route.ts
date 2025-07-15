import { db } from '@/database/db';
import { getCurrentUser } from '@/services/middleware-hono';
import { zValidator } from '@hono/zod-validator';
import { and, asc, count, eq, gte, lte, sql, sum } from 'drizzle-orm';
import { Hono } from 'hono';
import { dateRangeSchema } from '../schemas';

// service function
import { groupData } from '@/services/groupData';
import { DateModeType, StockHistoryType } from '../types';
// checkout
import { checkout as CheckoutTable } from '@/database/schema/checkout';
import { importExportHistory as ImportExportHistoryTable } from '@/database/schema/import-export-history';
import { preOrder as PreOrderTable } from '@/database/schema/pre-order';
import { product as ProductTable } from '@/database/schema/product';
import { formatStockHistory } from '@/services/formatStockHistory';
import { groupTopDrinks } from '@/services/groupTopDrinks';
import z from 'zod';

const app = new Hono()
    .get(
        '/total-count-infomation',
        getCurrentUser,
        zValidator('query', dateRangeSchema),
        async c => {
            const user = c.get('user');
            if (!user) {
                return c.json({ error: 'Unauthorized' }, 401);
            }

            const { startDate, endDate } = c.req.valid('query');
            const start = new Date(startDate); // includes all time that day
            const end = new Date(endDate);
            end.setDate(end.getDate() + 1); // exclusive upper bound

            try {
                const [totalCheckout] = await db
                    .select({
                        totalAdult: sum(CheckoutTable.paidAdultNumber),
                        totalChild: sum(CheckoutTable.paidChildNumber),
                        totalAmount: sum(CheckoutTable.totalAmount),
                        totalOrder: count(CheckoutTable.id),
                    })
                    .from(CheckoutTable)
                    .where(
                        and(
                            gte(CheckoutTable.updatedAt, start),
                            lte(CheckoutTable.updatedAt, end)
                        )
                    );

                const [totalPreOrder] = await db
                    .select({
                        totalPreOrder: count(PreOrderTable.id),
                    })
                    .from(PreOrderTable)
                    .where(
                        and(
                            eq(PreOrderTable.status, 'confirmed'),
                            eq(PreOrderTable.paymentStatus, 'paid'),
                            gte(PreOrderTable.updatedAt, start),
                            lte(PreOrderTable.updatedAt, end)
                        )
                    );

                const formattedTotal = {
                    totalAdult: Number(totalCheckout.totalAdult) ?? 0,
                    totalChild: Number(totalCheckout.totalChild) ?? 0,
                    totalAmount: Number(totalCheckout.totalAmount) ?? 0,
                    totalOrder: Number(totalCheckout.totalOrder) ?? 0,
                    totalPreOrder: Number(totalPreOrder.totalPreOrder) ?? 0,
                };

                return c.json(
                    {
                        message: 'Dashboard data fetched successfully',
                        result: formattedTotal,
                    },
                    200
                );
            } catch (error) {
                console.error(error);
                return c.json({ error: 'Internal server error' }, 500);
            }
        }
    )
    .get(
        'total-income-outcome',
        getCurrentUser,
        zValidator('query', dateRangeSchema),
        async c => {
            const user = c.get('user');

            if (!user) {
                return c.json({ error: 'Unauthorized' }, 401);
            }

            const { startDate, endDate, mode } = c.req.valid('query');
            const start = new Date(startDate); // includes all time that day
            const end = new Date(endDate);
            end.setDate(end.getDate() + 1); // exclusive upper bound

            try {
                const totalIncome = await db.query.checkout.findMany({
                    where: and(
                        gte(CheckoutTable.updatedAt, start),
                        lte(CheckoutTable.updatedAt, end)
                    ),
                    columns: {
                        totalAmount: true,
                        updatedAt: true,
                    },
                    orderBy: [asc(CheckoutTable.updatedAt)],
                });

                const totalOutcome =
                    await db.query.importExportHistory.findMany({
                        extras: {
                            totalAmount:
                                sql<number>`${ImportExportHistoryTable.totalPrice}`.as(
                                    'totalAmount'
                                ),
                        },
                        columns: {
                            updatedAt: true,
                        },
                        where: and(
                            gte(ImportExportHistoryTable.updatedAt, start),
                            lte(ImportExportHistoryTable.updatedAt, end)
                        ),
                    });

                const groupedIncome = groupData(
                    totalIncome,
                    mode as DateModeType
                );

                const groupedOutcome = groupData(
                    totalOutcome,
                    mode as DateModeType
                );

                // === Merge income + outcome ===
                const mergedMap = new Map<
                    string,
                    { date: string; income: number; outcome: number }
                >();

                for (const income of groupedIncome) {
                    mergedMap.set(income.date, {
                        date: income.date,
                        income: income.total,
                        outcome: 0,
                    });
                }

                for (const outcome of groupedOutcome) {
                    if (mergedMap.has(outcome.date)) {
                        mergedMap.get(outcome.date)!.outcome = outcome.total;
                    } else {
                        mergedMap.set(outcome.date, {
                            date: outcome.date,
                            income: 0,
                            outcome: outcome.total,
                        });
                    }
                }

                const mergedData = Array.from(mergedMap.values()).sort((a, b) =>
                    a.date.localeCompare(b.date)
                );

                return c.json(
                    {
                        message:
                            'Total income and outcome fetched successfully',
                        result: mergedData,
                    },
                    200
                );
            } catch (error) {
                console.error(error);
                return c.json({ error: 'Internal server error' }, 500);
            }
        }
    )
    .get(
        '/customer-count',
        getCurrentUser,
        zValidator('query', dateRangeSchema),
        async c => {
            const user = c.get('user');
            if (!user) {
                return c.json({ error: 'Unauthorized' }, 401);
            }

            try {
                const { startDate, endDate } = c.req.valid('query');
                const start = new Date(startDate); // includes all time that day
                const end = new Date(endDate);
                end.setDate(end.getDate() + 1); // exclusive upper bound

                const customerCount = await db.query.checkout.findMany({
                    extras: {
                        totalAmount:
                            sql<number>`${CheckoutTable.paidAdultNumber} + ${CheckoutTable.paidChildNumber}`.as(
                                'totalAmount'
                            ),
                    },
                    columns: {
                        updatedAt: true,
                    },
                    where: and(
                        gte(CheckoutTable.updatedAt, start),
                        lte(CheckoutTable.updatedAt, end)
                    ),
                    orderBy: [asc(CheckoutTable.updatedAt)],
                });

                const groupedCustomer = groupData(
                    customerCount,
                    'day' as DateModeType
                );

                return c.json(
                    {
                        message: 'Customer count fetched successfully',
                        result: groupedCustomer,
                    },
                    200
                );
            } catch (error) {
                console.log(error);
                return c.json({ error: 'Internal server error' }, 500);
            }
        }
    )
    .get(
        '/stock-history',
        getCurrentUser,
        zValidator(
            'query',
            dateRangeSchema.extend({
                category: z.enum(['วัตถุดิบ', 'เครื่องดื่ม']),
            })
        ),
        async c => {
            const user = c.get('user');
            if (!user) {
                return c.json({ error: 'Unauthorized' }, 401);
            }

            try {
                const { startDate, endDate, category } = c.req.valid('query');
                const start = new Date(startDate); // includes all time that day
                const end = new Date(endDate);
                end.setDate(end.getDate() + 1); // exclusive upper bound

                const productRaw = await db.query.product.findMany({
                    columns: {
                        id: true,
                        name: true,
                        stock: true,
                    },
                    where: eq(ProductTable.category, category),
                });

                const stockHistory =
                    await db.query.importExportHistory.findMany({
                        columns: {
                            productId: true,
                            stock: true,
                            type: true,
                        },
                        where: and(
                            gte(ImportExportHistoryTable.updatedAt, start),
                            lte(ImportExportHistoryTable.updatedAt, end)
                        ),
                    });

                const formattedStockHistory = formatStockHistory(
                    stockHistory as StockHistoryType[]
                );

                const formattedProduct = productRaw.map(item => {
                    const stockHistory = formattedStockHistory?.find(
                        stock => stock.productId === item.id
                    );

                    return {
                        productId: item.id,
                        productName: item.name,
                        total: item.stock,
                        totalIn: stockHistory?.totalIn ?? 0,
                        totalOut: stockHistory?.totalOut ?? 0,
                    };
                });
                return c.json({
                    message: 'Stock history fetched successfully',
                    result: formattedProduct,
                });
            } catch (error) {
                console.log(error);
                return c.json({ error: 'Internal server error' }, 500);
            }
        }
    )
    .get(
        '/top-drink',
        getCurrentUser,
        zValidator('query', dateRangeSchema),
        async c => {
            const user = c.get('user');
            if (!user) {
                return c.json({ error: 'Unauthorized' }, 401);
            }

            try {
                const { startDate, endDate } = c.req.valid('query');
                const start = new Date(startDate); // includes all time that day
                const end = new Date(endDate);
                end.setDate(end.getDate() + 1); // exclusive upper bound

                const topDrinkRaw = await db.query.checkoutInfos.findMany({
                    columns: {
                        productId: true,
                        quantity: true,
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
                    where: and(
                        gte(CheckoutTable.updatedAt, start),
                        lte(CheckoutTable.updatedAt, end)
                    ),
                });

                const groupedProduct = groupTopDrinks(topDrinkRaw);

                return c.json({
                    message: 'Top drink fetched successfully',
                    result: groupedProduct,
                });
            } catch (error) {
                console.log(error);
                return c.json({ error: 'Internal server error' }, 500);
            }
        }
    );

export default app;
