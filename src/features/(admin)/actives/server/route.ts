import { db } from "@/database/db";
import { getCurrentUser } from "@/services/middleware-hono";
import { Hono } from "hono";

const app = new Hono().get("/", getCurrentUser, async (c) => {
    const user = c.get("user");

    if (!user) {
        return c.json({ message: "Unauthorized" }, 401);
    }

    try {
        const actives = await db.query.active.findMany({
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

        if (!actives.length) {
            return c.json({ message: "Actives not found", result: [] }, 200);
        }

        const formattedActives = actives.map((active) => ({
            activeId: active.id,
            customerName: active.customerName,
            customerPhone: active.customerPhone,
            adultNumber: active.adultNumber,
            childNumber: active.childNumber,
            openTime: active.openTime,
            updatedAt: active.updatedAt,
            activeInfos: active.activeInfos.map((info) => ({
                activeInfoId: info.id,
                tableId: info.tableId,
                tableNumber: info.diningTable.tableNumber,
            })),
        }));

        console.log(formattedActives);

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
