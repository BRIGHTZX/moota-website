import { getCurrentUser } from "@/services/middleware-hono";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { insertStockProductSchema } from "../schemas";
import { db } from "@/database/db";
import { product as ProductTable } from "@/database/schema/product";

const app = new Hono()
    .get("/", getCurrentUser, async (c) => {
        const user = c.get("user");
        if (!user) {
            return c.json({ error: "Unauthorized" }, 401);
        }

        try {
            const products = await db
                .select({
                    id: ProductTable.id,
                    name: ProductTable.name,
                    image: ProductTable.image,
                    stocks: ProductTable.stock,
                    unit: ProductTable.unit,
                })
                .from(ProductTable);

            const formattedProducts = products.map((product) => ({
                id: product.id,
                products: {
                    name: product.name,
                    image: product.image,
                },
                stocks: {
                    stock: product.stocks,
                    unit: product.unit,
                },
            }));

            return c.json(
                {
                    message: "Products fetched successfully",
                    products: formattedProducts,
                },
                200
            );
        } catch (error) {
            console.log(error);
            return c.json({ error: "Internal Server Error" }, 500);
        }
    })
    .post(
        "/",
        getCurrentUser,
        zValidator("form", insertStockProductSchema),
        async (c) => {
            const user = c.get("user");
            if (!user) {
                return c.json({ error: "Unauthorized" }, 401);
            }

            try {
                console.log(c.req.valid("form"));
                return c.json(
                    { message: "Product stock added successfully" },
                    200
                );
            } catch (error) {
                console.log(error);
                return c.json({ error: "Internal Server Error" }, 500);
            }
        }
    );

export default app;
