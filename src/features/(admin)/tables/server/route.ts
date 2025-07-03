import { Hono } from "hono";
import { db } from "@/database/db";
import { table as TablesTable } from "@/database/schema/table";
import {
    active as ActiveTable,
    activeInfo as ActiveInfoTable,
} from "@/database/schema/active";
import { insertTalblesSchema, selectTablesSchemaType } from "../schema";
import { eq } from "drizzle-orm";
import { getCurrentUser } from "@/services/middleware-hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

const app = new Hono()
    .get("/", getCurrentUser, async (c) => {
        const user = c.get("user");

        if (!user) {
            return c.json({ message: "Unauthorized" }, 401);
        }

        try {
            const tables: selectTablesSchemaType[] = await db
                .select({
                    id: TablesTable.id,
                    tableNumber: TablesTable.tableNumber,
                    tableType: TablesTable.tableType,
                    isAvailable: TablesTable.isAvailable,
                })
                .from(TablesTable)
                .where(eq(TablesTable.isAvailable, true));
            return c.json(
                { message: "Tables fetched successfully", tables },
                200
            );
        } catch (error) {
            console.log(error);
            return c.json({ message: "Internal server error" }, 500);
        }
    })
    .post(
        "/open-table",
        getCurrentUser,
        zValidator(
            "json",
            insertTalblesSchema.merge(
                z.object({
                    tableNumber: z.array(z.string()),
                })
            )
        ),
        async (c) => {
            const user = c.get("user");

            if (!user) {
                return c.json({ message: "Unauthorized" }, 401);
            }

            try {
                const {
                    customerName,
                    customerPhone,
                    adultNumber,
                    childNumber,
                    tableNumber,
                } = await c.req.json();

                await db.transaction(async (tx) => {
                    const [active] = await tx
                        .insert(ActiveTable)
                        .values({
                            customerName,
                            customerPhone: customerPhone ?? null,
                            openTime: new Date().toLocaleTimeString("th-TH", {
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: false,
                            }),
                        })
                        .returning({ id: ActiveTable.id });

                    // Insert active info for each table
                    for (const tableId of tableNumber) {
                        await tx.insert(ActiveInfoTable).values({
                            activeId: active.id,
                            tableId: tableId,
                            adultNumber,
                            childNumber,
                        });
                    }
                });

                return c.json({ message: "Open Table Successfully" }, 200);
            } catch (error) {
                console.log(error);
                return c.json({ message: "Internal server error" }, 500);
            }
        }
    );

export default app;
