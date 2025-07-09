import { getCurrentUser } from "@/services/middleware-hono";
import { Hono } from "hono";

import { db } from "@/database/db";
import { eq, inArray } from "drizzle-orm";
import { zValidator } from "@hono/zod-validator";
import { getOrderListSchema } from "../schemas";
import { active as ActiveTable } from "@/database/schema/active";
import { order as OrderTable } from "@/database/schema/order";

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
    .post(
        "/get-order-lists",
        getCurrentUser,
        zValidator("json", getOrderListSchema),
        async (c) => {
            const user = c.get("user");

            if (!user) {
                return c.json({ message: "Unauthorized" }, 401);
            }

            try {
                const { activeInfoId } = c.req.valid("json");

                const orderLists = await db.query.order.findMany({
                    where: inArray(OrderTable.activeInfoId, activeInfoId),
                    with: {
                        orderItems: {
                            with: {
                                product: true,
                            },
                        },
                    },
                });

                if (!orderLists.length) {
                    return c.json(
                        { message: "Order not found", result: [] },
                        200
                    );
                }

                // Grouped Product Orders
                const productMap = new Map();
                for (const order of orderLists) {
                    for (const item of order.orderItems) {
                        const { productId, quantity, pricePerUnit, product } =
                            item;

                        if (!productMap.has(productId)) {
                            productMap.set(productId, {
                                productId,
                                productName: product.name.trim(),
                                pricePerUnit: pricePerUnit,
                                quantity: 0,
                                totalPrice: 0,
                            });
                        }

                        const current = productMap.get(productId);
                        current.quantity += quantity;
                        current.totalPrice += pricePerUnit * quantity;
                    }
                }

                const groupedProductOrders = Array.from(productMap.values());

                return c.json(
                    {
                        message: "Fetch order list successfully",
                        result: groupedProductOrders,
                    },
                    200
                );
            } catch (error) {
                console.log(error);
                return c.json({ message: "Internal Server Error" }, 500);
            }
        }
    );

export default app;
