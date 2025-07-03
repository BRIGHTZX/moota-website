import { db } from "@/database/db";
import { getCurrentUser } from "@/services/middleware-hono";
import { Hono } from "hono";
import { and, desc, eq } from "drizzle-orm";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

import {
    preOrder as PreOrderTable,
    preOrderInfo as PreOrderInfoTable,
} from "@/database/schema/pre-order";
import { table as TablesTable } from "@/database/schema/table";
import {
    active as ActiveTable,
    activeInfo as ActiveInfoTable,
} from "@/database/schema/active";

const app = new Hono()
    .get("/", getCurrentUser, async (c) => {
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
                .where(
                    and(
                        eq(PreOrderTable.status, "pending"),
                        eq(PreOrderTable.paymentStatus, "paid")
                    )
                )
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
    })
    .get("/:preOrderId", getCurrentUser, async (c) => {
        const user = c.get("user");

        if (!user) {
            return c.json({ message: "Unauthorized" }, 401);
        }

        try {
            const preOrderId = c.req.param("preOrderId");

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
                        paymentImage: PreOrderTable.paymentImage,
                        createdAt: PreOrderTable.createdAt,
                    },
                    table: {
                        id: PreOrderInfoTable.tableId,
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
                .where(
                    and(
                        eq(PreOrderTable.id, preOrderId),
                        eq(PreOrderTable.userKindeId, user.id.toString())
                    )
                );

            if (!preOrders.length) {
                return c.json({ message: "Reservation not found" }, 404);
            }

            const formattedPreOrder = {
                ...preOrders[0].preOrder,
                table: preOrders.map((row) => ({
                    id: row.table.id!,
                    tableNumber: row.table.tableNumber!,
                })),
            };

            return c.json(
                {
                    message: "Reservation fetched successfully",
                    result: formattedPreOrder,
                },
                200
            );
        } catch (error) {
            console.log(error);
            return c.json({ message: "Internal server error", error }, 500);
        }
    })
    .post(
        "/create-active",
        getCurrentUser,
        zValidator(
            "json",
            z.object({
                preOrderId: z.string(),
            })
        ),
        async (c) => {
            const user = c.get("user");

            if (!user) {
                return c.json({ message: "Unauthorized" }, 401);
            }

            try {
                const { preOrderId } = c.req.valid("json");

                const result = await db.transaction(async (tx) => {
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
                        throw new Error("Pre-order not found");
                    }

                    const preOrderInfo = await tx
                        .select({
                            id: PreOrderInfoTable.id,
                            tableId: PreOrderInfoTable.tableId,
                        })
                        .from(PreOrderInfoTable)
                        .where(eq(PreOrderInfoTable.preOrderId, preOrderId));

                    if (!preOrderInfo) {
                        throw new Error("Pre-order info not found");
                    }

                    const [active] = await tx
                        .insert(ActiveTable)
                        .values({
                            customerName: preOrder.customerName,
                            customerPhone: preOrder.phoneNumber,
                            openTime: preOrder.reservationTime,
                        })
                        .returning({
                            id: ActiveTable.id,
                        });

                    await tx.insert(ActiveInfoTable).values(
                        preOrderInfo.map((info) => ({
                            activeId: active.id,
                            tableId: info.tableId,
                            adultNumber: preOrder.adultNumber,
                            childNumber: preOrder.childNumber,
                        }))
                    );

                    return active;
                });

                return c.json(
                    { message: "Active created successfully", result },
                    200
                );
            } catch (error) {
                console.log(error);
                return c.json({ message: "Invalid request" }, 400);
            }
        }
    );

export default app;
