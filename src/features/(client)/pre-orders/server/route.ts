import { db } from "@/database/db";
import { getCurrentUser } from "@/services/middleware-hono";
import { desc, eq } from "drizzle-orm";
import { Hono } from "hono";
import {
    preOrder as PreOrderTable,
    preOrderInfo as PreOrderInfoTable,
} from "@/database/schema/pre-order";
import { table as TablesTable } from "@/database/schema/table";

const app = new Hono().get("/", getCurrentUser, async (c) => {
    const user = c.get("user");

    if (!user) {
        return c.json({ message: "Unauthorized" }, 401);
    }

    try {
        const preOrders = await db
            .select({
                preOrder: {
                    id: PreOrderTable.id,
                    preOrderNumber: PreOrderTable.preOrderNumber,
                    customerName: PreOrderTable.customerName,
                    phoneNumber: PreOrderTable.phoneNumber,
                    adultNumber: PreOrderTable.adultNumber,
                    childNumber: PreOrderTable.childNumber,
                    totalPrice: PreOrderTable.totalPrice,
                    reservationDate: PreOrderTable.reservationDate,
                    reservationTime: PreOrderTable.reservationTime,
                    status: PreOrderTable.status,
                    paymentStatus: PreOrderTable.paymentStatus,
                    createdAt: PreOrderTable.createdAt,
                },
                table: {
                    preOrderId: PreOrderInfoTable.preOrderId,
                    id: TablesTable.id,
                    tableNumber: TablesTable.tableNumber,
                },
            })
            .from(PreOrderTable)
            .leftJoin(
                PreOrderInfoTable,
                eq(PreOrderTable.id, PreOrderInfoTable.preOrderId)
            )
            .leftJoin(
                TablesTable,
                eq(PreOrderInfoTable.tableId, TablesTable.id)
            )
            .where(eq(PreOrderTable.userKindeId, user.id))
            .orderBy(desc(PreOrderTable.createdAt));

        if (!preOrders.length) {
            return c.json({ message: "Reservation not found" }, 404);
        }

        const preOrderMap = new Map();

        for (const row of preOrders) {
            const preOrderId = row.preOrder.id;

            if (!preOrderMap.has(preOrderId)) {
                preOrderMap.set(preOrderId, {
                    ...row.preOrder,
                    tables: [],
                });
            }

            if (row.table?.id) {
                preOrderMap.get(preOrderId).tables.push({
                    id: row.table.id,
                    tableNumber: row.table.tableNumber,
                });
            }
        }

        const formattedPreOrders = Array.from(preOrderMap.values());

        return c.json(
            {
                message: "Reservation fetched successfully",
                result: formattedPreOrders,
            },
            200
        );
    } catch (error) {
        console.error(error);
        return c.json({ message: "Internal server error" }, 500);
    }
});

export default app;
