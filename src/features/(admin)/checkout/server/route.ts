import { getCurrentUser } from "@/services/middleware-hono";
import { Hono } from "hono";

import { db } from "@/database/db";
import { eq, inArray } from "drizzle-orm";
import { zValidator } from "@hono/zod-validator";
import { getOrderListSchema } from "../schemas";
import {
    order as OrderTable,
    orderItem as OrderItemTable,
} from "@/database/schema/order";

const app = new Hono()
    .get("/checkout-info/:activeId", async (c) => {
        try {
            const activeId = c.req.param("activeId");

            const active = await db;
            console.log(active);
            // const actives = await db
            //     .select({
            //         active: {
            //             activeId: ActiveTable.id,
            //             customerName: ActiveTable.customerName,
            //             customerPhone: ActiveTable.customerPhone,
            //             adultNumber: ActiveTable.adultNumber,
            //             childNumber: ActiveTable.childNumber,
            //             openTime: ActiveTable.openTime,
            //             updatedAt: ActiveTable.updatedAt,
            //         },
            //         activeInfo: {
            //             activeInfoId: ActiveInfoTable.id,
            //             tableId: ActiveInfoTable.tableId,
            //             tableNumber: TablesTable.tableNumber,
            //         },
            //     })
            //     .from(ActiveTable)
            //     .leftJoin(
            //         ActiveInfoTable,
            //         eq(ActiveTable.id, ActiveInfoTable.activeId)
            //     )
            //     .leftJoin(
            //         TablesTable,
            //         eq(ActiveInfoTable.tableId, TablesTable.id)
            //     )
            //     .orderBy(desc(ActiveTable.updatedAt))
            //     .where(eq(ActiveTable.id, activeId));

            // const activeMap = new Map();

            // for (const row of actives) {
            //     const activeId = row.active.activeId;

            //     if (!activeMap.has(activeId)) {
            //         activeMap.set(activeId, {
            //             ...row.active,
            //             activeInfo: [],
            //         });
            //     }

            //     if (row.activeInfo.activeInfoId) {
            //         activeMap.get(activeId).activeInfo.push({
            //             activeInfoId: row.activeInfo.activeInfoId,
            //             tableId: row.activeInfo.tableId,
            //             tableNumber: row.activeInfo.tableNumber,
            //         });
            //     }
            // }

            // const formattedActives = Array.from(activeMap.values())[0] ?? null;

            return c.json({
                message: "Success",
                result: active,
            });
        } catch (error) {
            if (error instanceof Error) {
                console.log("error:", error.message);
            } else {
                console.log("error:", error);
            }
            return c.json({ message: "Internal Server Error" }, 500);
        }
    })
    .get(
        "get-order-list",
        getCurrentUser,
        zValidator("json", getOrderListSchema),
        async (c) => {
            const user = c.get("user");

            if (!user) {
                return c.json({ message: "Unauthorized" }, 401);
            }

            try {
                const { activeInfoId } = c.req.valid("json");

                const orderList = await db
                    .select()
                    .from(OrderTable)
                    .where(inArray(OrderTable.activeInfoId, activeInfoId))
                    .leftJoin(
                        OrderItemTable,
                        eq(OrderTable.id, OrderItemTable.orderId)
                    );
            } catch (error) {
                console.log(error);
                return c.json({ message: "Internal Server Error" }, 500);
            }
        }
    );

export default app;
