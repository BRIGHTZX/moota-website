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
import { active as ActiveTable } from "@/database/schema/active";

const app = new Hono()
    .get("/checkout-info/:activeId", async (c) => {
        try {
            const activeId = c.req.param("activeId");

            const active = await db.query.active.findFirst({
                where: eq(ActiveTable.id, activeId),
                columns: {
                    id: true,
                    customerName: true,
                    customerPhone: true,
                    adultNumber: true,
                    childNumber: true,
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

            const formattedActives = {
                ...active,
                activeInfos: active?.activeInfos.map((info) => ({
                    activeInfoId: info.id,
                    tableId: info.tableId,
                    tableNumber: info.diningTable.tableNumber,
                })),
            };

            console.log(formattedActives);

            return c.json({
                message: "Fetch checkout info successfully",
                result: formattedActives,
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
