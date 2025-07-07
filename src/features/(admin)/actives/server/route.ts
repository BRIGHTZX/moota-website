import { db } from "@/database/db";
import { getCurrentUser } from "@/services/middleware-hono";
import { Hono } from "hono";
import { desc, eq } from "drizzle-orm";
import {
    active as ActiveTable,
    activeInfo as ActiveInfoTable,
} from "@/database/schema/tables/active";
import { diningTable as DiningTable } from "@/database/schema/tables/diningTable";

const app = new Hono().get("/", getCurrentUser, async (c) => {
    const user = c.get("user");

    if (!user) {
        return c.json({ message: "Unauthorized" }, 401);
    }

    try {
        const actives = await db
            .select({
                active: {
                    activeId: ActiveTable.id,
                    customerName: ActiveTable.customerName,
                    customerPhone: ActiveTable.customerPhone,
                    adultNumber: ActiveTable.adultNumber,
                    childNumber: ActiveTable.childNumber,
                    openTime: ActiveTable.openTime,
                    updatedAt: ActiveTable.updatedAt,
                },
                activeInfo: {
                    activeInfoId: ActiveInfoTable.id,
                    tableId: ActiveInfoTable.tableId,
                    tableNumber: DiningTable.tableNumber,
                },
            })
            .from(ActiveTable)
            .leftJoin(
                ActiveInfoTable,
                eq(ActiveTable.id, ActiveInfoTable.activeId)
            )
            .leftJoin(DiningTable, eq(ActiveInfoTable.tableId, DiningTable.id))
            .orderBy(desc(ActiveTable.updatedAt));

        const activeMap = new Map();

        for (const row of actives) {
            const activeId = row.active.activeId;

            if (!activeMap.has(activeId)) {
                activeMap.set(activeId, {
                    ...row.active,
                    activeInfo: [],
                });
            }

            if (row.activeInfo.activeInfoId) {
                activeMap.get(activeId).activeInfo.push({
                    activeInfoId: row.activeInfo.activeInfoId,
                    tableId: row.activeInfo.tableId,
                    tableNumber: row.activeInfo.tableNumber,
                });
            }
        }

        const formattedActives = Array.from(activeMap.values());

        return c.json({
            message: "Actives fetched successfully",
            result: formattedActives,
        });
    } catch (error) {
        console.log(error);
        return c.json({ message: "Internal server error" }, 500);
    }
});
export default app;
