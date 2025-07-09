import { getCurrentUser } from "@/services/middleware-hono";
import { Hono } from "hono";

import { db } from "@/database/db";
import { and, eq, inArray, or } from "drizzle-orm";
import { zValidator } from "@hono/zod-validator";
import { getOrderListSchema, insertCheckoutSchema } from "../schemas";

import {
    active as ActiveTable,
    activeInfo as ActiveInfoTable,
} from "@/database/schema/active";
import { order as OrderTable } from "@/database/schema/order";
import {
    checkout as CheckoutTable,
    checkoutInfos as CheckoutInfosTable,
} from "@/database/schema/checkout";
import { diningTable as DiningTable } from "@/database/schema/diningTable";

const app = new Hono()
    .get("/checkout-info/:activeId", async (c) => {
        try {
            const activeId = c.req.param("activeId");

            const active = await db.query.active.findFirst({
                where: and(
                    eq(ActiveTable.id, activeId),
                    or(
                        eq(ActiveTable.status, "open"),
                        eq(ActiveTable.status, "partial")
                    )
                ),
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
    )
    .post(
        "/checkout/:activeId",
        getCurrentUser,
        zValidator("json", insertCheckoutSchema),
        async (c) => {
            const user = c.get("user");

            if (!user) {
                return c.json({ message: "Unauthorized" }, 401);
            }

            try {
                const { activeId } = c.req.param();
                const {
                    activeInfoId,
                    tableId,
                    customerName,
                    paidAdultNumber,
                    paidChildNumber,
                    totalOrderPrice,
                    totalDiscount,
                    totalAmount,
                    paymentMethod,
                    status,
                    orderList,
                } = c.req.valid("json");

                if (status !== "partial" && status !== "closed") {
                    return c.json({ message: "Invalid status" }, 400);
                }

                const result = await db.transaction(async (tx) => {
                    const [checkout] = await tx
                        .insert(CheckoutTable)
                        .values({
                            activeId,
                            customerName,
                            paidAdultNumber: Number(paidAdultNumber),
                            paidChildNumber: Number(paidChildNumber),
                            totalOrderPrice: Number(totalOrderPrice),
                            totalDiscount: Number(totalDiscount),
                            totalAmount: Number(totalAmount),
                            paymentMethod,
                        })
                        .returning({ id: CheckoutTable.id });

                    await tx.insert(CheckoutInfosTable).values(
                        orderList.map((item) => ({
                            checkoutId: checkout.id,
                            productId: item.productId,
                            quantity: Number(item.quantity),
                            pricePerUnit: Number(item.pricePerUnit),
                            totalPrice: Number(item.totalPrice),
                        }))
                    );

                    await tx
                        .update(DiningTable)
                        .set({
                            isAvailable: true,
                        })
                        .where(inArray(DiningTable.id, tableId));

                    await tx
                        .delete(ActiveInfoTable)
                        .where(inArray(ActiveInfoTable.id, activeInfoId));

                    await tx
                        .update(ActiveTable)
                        .set({
                            status: status,
                        })
                        .where(eq(ActiveTable.id, activeId));
                });

                return c.json({
                    message: "Create checkout successfully",
                    result: result,
                });
            } catch (error) {
                console.log(error);
                return c.json({ message: "Internal Server Error" }, 500);
            }
        }
    );

export default app;
