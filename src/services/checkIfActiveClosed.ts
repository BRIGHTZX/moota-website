"use server";
import { db } from "@/database/db";
import { and, eq } from "drizzle-orm";
import { active } from "@/database/schema/active";

export const checkIfActiveClosed = async (activeId: string) => {
    const result = await db.query.active.findFirst({
        where: and(eq(active.id, activeId), eq(active.status, "closed")),
        columns: {
            status: true,
        },
    });

    return result?.status === "closed";
};
