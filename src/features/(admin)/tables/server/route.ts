import { Hono } from "hono";
import { db } from "@/database/db";
import { table as TablesTable } from "@/database/schema/table";
import { selectTablesSchemaType } from "../schema";
import { eq } from "drizzle-orm";

const app = new Hono().get("/", async (c) => {
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
        return c.json({ message: "Tables fetched successfully", tables }, 200);
    } catch (error) {
        console.log(error);
        return c.json({ message: "Internal server error" }, 500);
    }
});

export default app;
