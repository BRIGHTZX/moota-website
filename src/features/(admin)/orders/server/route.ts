import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { getCurrentUser } from "@/services/middleware-hono";

import { db } from "@/database/db";
import { asc, eq, inArray, sql } from "drizzle-orm";
import z from "zod";
import { insertOrderSchema } from "../schemas";

import { product as ProductTable } from "@/database/schema/product";
import { activeInfo as ActiveInfoTable } from "@/database/schema/active";
import { table as TablesTable } from "@/database/schema/table";
import {
    order as OrderTable,
    orderItem as OrderItemTable,
} from "@/database/schema/order";
import { OrderItem, OrderItemDB } from "../types";
import { groupBy } from "@/services/groupBy";

const app = new Hono()
    .get("/product-drink-list", getCurrentUser, async (c) => {
        const user = c.get("user");

        if (!user) {
            return c.json({ error: "Unauthorized" }, 401);
        }

        try {
            const drinkList = await db
                .select({
                    id: ProductTable.id,
                    name: ProductTable.name,
                    stock: ProductTable.stock,
                    unit: ProductTable.unit,
                    price: ProductTable.price,
                    image: ProductTable.image,
                })
                .from(ProductTable)
                .where(eq(ProductTable.category, "เครื่องดื่ม"))
                .orderBy(asc(ProductTable.name));

            return c.json({ message: "success", result: drinkList }, 200);
        } catch (error) {
            console.log(error);
            return c.json({ error: "Internal server error" }, 500);
        }
    })
    .get(
        "/get-activeInfo-tableNumber/:activeInfoId",
        getCurrentUser,
        zValidator(
            "param",
            z.object({
                activeInfoId: z.string(),
            })
        ),
        async (c) => {
            const user = c.get("user");

            if (!user) {
                return c.json({ error: "Unauthorized" }, 401);
            }

            try {
                const activeInfoId = c.req.param("activeInfoId");
                const [activeInfo] = await db
                    .select({
                        activeInfoId: ActiveInfoTable.id,
                        tableId: ActiveInfoTable.tableId,
                        tableNumber: TablesTable.tableNumber,
                    })
                    .from(ActiveInfoTable)
                    .where(eq(ActiveInfoTable.id, activeInfoId ?? ""))
                    .innerJoin(
                        TablesTable,
                        eq(ActiveInfoTable.tableId, TablesTable.id)
                    )
                    .limit(1);

                return c.json({ message: "success", result: activeInfo }, 200);
            } catch (error) {
                console.log(error);
                return c.json({ error: "Internal server error" }, 500);
            }
        }
    )
    .get("/order-history/:activeInfoId", getCurrentUser, async (c) => {
        const user = c.get("user");

        if (!user) {
            return c.json({ error: "Unauthorized" }, 401);
        }

        try {
            const activeInfoId = c.req.param("activeInfoId");

            const orders = await db
                .select({
                    id: OrderTable.id,
                    totalPrice: OrderTable.totalPrice,
                    updatedAt: OrderTable.updatedAt,
                })
                .from(OrderTable)
                .where(eq(OrderTable.activeInfoId, activeInfoId));

            const orderIds = orders.map((order) => order.id);

            const orderItems = await db
                .select({
                    id: OrderItemTable.id,
                    orderId: OrderItemTable.orderId,
                    productId: OrderItemTable.productId,
                    quantity: OrderItemTable.quantity,
                    pricePerUnit: OrderItemTable.pricePerUnit,
                    productName: ProductTable.name,
                })
                .from(OrderItemTable)
                .leftJoin(
                    ProductTable,
                    eq(OrderItemTable.productId, ProductTable.id)
                )
                .where(inArray(OrderItemTable.orderId, orderIds))
                .limit(1);

            const groupedOrderItems = groupBy<OrderItemDB, string>(
                orderItems as OrderItemDB[],
                (item) => item.orderId
            ) as Record<string, OrderItemDB[]>;

            console.log("groupedOrderItems : ", groupedOrderItems);

            const formattedOrderList = orders.map((order) => ({
                id: order.id,
                totalPrice: order.totalPrice,
                updatedAt: order.updatedAt,
                orderItems: groupedOrderItems[order.id],
            }));

            console.log("formattedOrderList : ", formattedOrderList);

            return c.json(
                { message: "success", result: formattedOrderList },
                200
            );
        } catch (error) {
            console.log(error);
            return c.json({ error: "Internal server error" }, 500);
        }
    })
    .post(
        "/create-order",
        getCurrentUser,
        zValidator("json", insertOrderSchema),
        async (c) => {
            const user = c.get("user");

            if (!user) {
                return c.json({ error: "Unauthorized" }, 401);
            }

            try {
                const { activeInfoId, totalPrice, orderList } =
                    await c.req.json();

                await db.transaction(async (tx) => {
                    for (const item of orderList) {
                        await tx
                            .update(ProductTable)
                            .set({
                                stock: sql`${ProductTable.stock} - ${item.quantity}`,
                            })
                            .where(eq(ProductTable.id, item.product.id));
                    }

                    const [order] = await tx
                        .insert(OrderTable)
                        .values({
                            activeInfoId,
                            totalPrice,
                        })
                        .returning({
                            id: OrderTable.id,
                        });

                    await tx.insert(OrderItemTable).values(
                        orderList.map((item: OrderItem) => ({
                            orderId: order.id,
                            productId: item.product.id,
                            quantity: item.quantity,
                            pricePerUnit: item.product.price,
                        }))
                    );
                });

                return c.json({ message: "create order successfully" }, 200);
            } catch (error) {
                console.log(error);
                return c.json({ error: "Internal server error" }, 500);
            }
        }
    );

export default app;
