import { Hono } from "hono";
import { getCurrentUser } from "@/services/middleware-hono";

import { db } from "@/database/db";
import { eq } from "drizzle-orm";

import { product as ProductTable } from "@/database/schema/product";
import { activeInfo as ActiveInfoTable } from "@/database/schema/active";
import { table as TablesTable } from "@/database/schema/table";
import { zValidator } from "@hono/zod-validator";
import z from "zod";

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
                .where(eq(ProductTable.category, "เครื่องดื่ม"));

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
    .post("/create-order", getCurrentUser, async (c) => {
        const user = c.get("user");

        if (!user) {
            return c.json({ error: "Unauthorized" }, 401);
        }

        const { orderList } = await c.req.json();
    });

export default app;
