import { db } from "@/database/db";
import { getCurrentUser } from "@/services/middleware-hono";
import { and, count, eq, gte, lte, sum } from "drizzle-orm";
import { Hono } from "hono";

// checkout
import { checkout as CheckoutTable } from "@/database/schema/checkout";
import { preOrder as PreOrderTable } from "@/database/schema/pre-order";
import { zValidator } from "@hono/zod-validator";
import { dateRangeSchema } from "../schemas";

const app = new Hono().get(
    "/total-count-infomation",

    getCurrentUser,
    zValidator("query", dateRangeSchema),
    async (c) => {
        const user = c.get("user");
        if (!user) {
            return c.json({ error: "Unauthorized" }, 401);
        }

        const { startDate, endDate } = c.req.valid("query");
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
                        eq(PreOrderTable.status, "confirmed"),
                        eq(PreOrderTable.paymentStatus, "paid"),
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
                    message: "Dashboard data fetched successfully",
                    result: formattedTotal,
                },
                200
            );
        } catch (error) {
            console.error(error);
            return c.json({ error: "Internal server error" }, 500);
        }
    }
);

export default app;
