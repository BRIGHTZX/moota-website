import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { getCurrentUser } from "@/services/middleware-hono";
import { eq, sql } from "drizzle-orm";

import { db } from "@/database/db";
import { importExportProductSchema } from "../schemas";
import { product as ProductTable } from "@/database/schema/product";
import { importExportHistory as ImportExportHistoryTable } from "@/database/schema/import-export-history";

const app = new Hono()
    .get("/:productId", getCurrentUser, async (c) => {
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
                    unit: ProductTable.unit,
                    stock: ProductTable.stock,
                })
                .from(ProductTable)
                .where(eq(ProductTable.id, productId))
                .limit(1);

            if (!product) {
                return c.json({ error: "Product not found" }, 404);
            }

            return c.json({ message: "fetch product success", product }, 200);
        } catch (error) {
            console.log(error);
            return c.json({ error: "Internal Server Error" }, 500);
        }
    })
    .post(
        "/:productId",
        getCurrentUser,
        zValidator("json", importExportProductSchema),
        async (c) => {
            const user = c.get("user");
            if (!user) {
                return c.json({ error: "Unauthorized" }, 401);
            }

            try {
                const productId = c.req.param("productId");
                const { stock, type } = await c.req.json();

                await db.transaction(async (tx) => {
                    // ดึงข้อมูลปัจจุบันมาเช็ก ก่อนจะ export
                    const [product] = await tx
                        .select({ currentStock: ProductTable.stock })
                        .from(ProductTable)
                        .where(eq(ProductTable.id, productId))
                        .limit(1);

                    if (!product) throw new Error("Product not found");

                    if (type === "export" && product.currentStock < stock) {
                        throw new Error(
                            "จำนวนสินค้าคงเหลือไม่พอสำหรับการส่งออก"
                        );
                    }

                    //–––– 3) อัปเดต stock ด้วย SQL expression ------------------------
                    await tx
                        .update(ProductTable)
                        .set({
                            stock:
                                type === "import"
                                    ? sql`${ProductTable.stock} + ${stock}`
                                    : sql`${ProductTable.stock} - ${stock}`,
                            updatedAt: new Date(),
                        })
                        .where(eq(ProductTable.id, productId));

                    //–––– 4) บันทึกประวัติ ------------------------------------------
                    await tx.insert(ImportExportHistoryTable).values({
                        productId,
                        stock,
                        type,
                    });
                });
                return c.json(
                    { message: "add import/export product success" },
                    200
                );
            } catch (error) {
                console.log(error);
                return c.json({ error: "Internal Server Error" }, 500);
            }
        }
    );

export default app;
