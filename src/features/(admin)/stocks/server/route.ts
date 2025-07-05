import { getCurrentUser } from "@/services/middleware-hono";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { insertStockProductSchema } from "../schemas";
import { db } from "@/database/db";
import { product as ProductTable } from "@/database/schema/product";
import { eq } from "drizzle-orm";
import { connectCloudinary } from "@/lib/cloudinary";

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
    .get("/detail/:productId", getCurrentUser, async (c) => {
        const user = c.get("user");
        if (!user) {
            return c.json({ error: "Unauthorized" }, 401);
        }

        try {
            const productId = c.req.param("productId");

            const [product] = await db
                .select({
                    id: ProductTable.id,
                    name: ProductTable.name,
                    image: ProductTable.image,
                    stocks: ProductTable.stock,
                    unit: ProductTable.unit,
                    price: ProductTable.price,
                    category: ProductTable.category,
                })
                .from(ProductTable)
                .where(eq(ProductTable.id, productId))
                .limit(1);

            if (!product) {
                return c.json({ error: "Product not found" }, 404);
            }

            return c.json({ product: product }, 200);
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
                const { name, image, unit, category, stock, price } =
                    c.req.valid("form");

                const cloudinaryInstance = await connectCloudinary();

                let imageUrl = "";

                if (image instanceof File) {
                    imageUrl = await (async (): Promise<string> => {
                        if (image instanceof File) {
                            const arrayBuffer = await image.arrayBuffer();
                            const buffer = Buffer.from(arrayBuffer);
                            const result =
                                await cloudinaryInstance.uploader.upload(
                                    "data:" +
                                        image.type +
                                        ";base64," +
                                        buffer.toString("base64"),
                                    {
                                        resource_type: "image",
                                    }
                                );
                            return result.secure_url;
                        }
                        throw new Error("รูปภาพหลักฐานการชำระเงินไม่ถูกต้อง");
                    })();
                }

                await db.insert(ProductTable).values({
                    name,
                    image: imageUrl,
                    unit,
                    category,
                    stock,
                    price,
                });

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
