import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { getCurrentUser } from "@/services/middleware-hono";
import { and, desc, eq, gte, lte, sql } from "drizzle-orm";

import { db } from "@/database/db";
import { importExportProductSchema } from "../schemas";
import { product as ProductTable } from "@/database/schema/product";
import { importExportHistory as ImportExportHistoryTable } from "@/database/schema/import-export-history";
import { z } from "zod";
import { mapHistoryDateToRecord } from "@/services/mapHistoryDateToRecord";

const app = new Hono()
    .get(
        "/",
        getCurrentUser,
        zValidator(
            "query",
            z.object({
                startDate: z.string(),
                endDate: z.string(),
            })
        ),
        async (c) => {
            const user = c.get("user");

            if (!user) {
                return c.json({ error: "Unauthorized" }, 401);
            }

            try {
                const { startDate, endDate } = await c.req.query();
                const start = new Date(startDate); // includes all time that day
                const end = new Date(endDate);
                end.setDate(end.getDate() + 1); // exclusive upper bound

                const result = await db
                    .select({
                        id: ImportExportHistoryTable.id,
                        productId: ImportExportHistoryTable.productId,
                        productName: ProductTable.name,
                        productUnit: ProductTable.unit,
                        stock: ImportExportHistoryTable.stock,
                        type: ImportExportHistoryTable.type,
                        updatedAt: ImportExportHistoryTable.updatedAt,
                    })
                    .from(ImportExportHistoryTable)
                    .where(
                        and(
                            gte(
                                ImportExportHistoryTable.updatedAt,
                                new Date(start)
                            ),
                            lte(
                                ImportExportHistoryTable.updatedAt,
                                new Date(end)
                            )
                        )
                    )
                    .leftJoin(
                        ProductTable,
                        eq(ImportExportHistoryTable.productId, ProductTable.id)
                    )
                    .orderBy(desc(ImportExportHistoryTable.updatedAt));

                const formattedHistory = mapHistoryDateToRecord(
                    result
                        .filter((item) => item.productId !== null)
                        .map((item) => ({
                            ...item,
                            productId: item.productId!,
                            productName: item.productName!,
                            productUnit: item.productUnit!,
                            type: item.type as "import" | "export",
                            updatedAt: item.updatedAt.toISOString(),
                        }))
                );

                return c.json(
                    {
                        message: "History fetched successfully",
                        history: formattedHistory,
                    },
                    200
                );
            } catch (error) {
                console.log(error);
                return c.json({ error: "Internal Server Error" }, 500);
            }
        }
    )
    .get("/get-product-info/:productId", getCurrentUser, async (c) => {
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
