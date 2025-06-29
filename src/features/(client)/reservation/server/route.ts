import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { getCurrentUser } from "@/services/middleware-hono";

import { db } from "@/database/db";
import { insertPreOrderWithoutTableIdSchema } from "../schema";
import {
    preOrder as PreOrderTable,
    preOrderInfo as PreOrderInfoTable,
} from "@/database/schema/pre-order";
import { z } from "zod";

const reservationRoute = new Hono().post(
    "/",
    getCurrentUser,
    zValidator(
        "json",
        insertPreOrderWithoutTableIdSchema.merge(
            z.object({ tableId: z.array(z.string()) })
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
                phoneNumber,
                email,
                tableId,
                adultNumber,
                childNumber,
                reservationDate,
                reservationTime,
            } = c.req.valid("json");

            const result = await db.transaction(async (trx) => {
                const [preOrder] = await trx
                    .insert(PreOrderTable)
                    .values({
                        userKindeId: user.id.toString(),
                        customerName,
                        phoneNumber,
                        email,
                        adultNumber: adultNumber,
                        childNumber: childNumber,
                        status: "pending",
                        paymentStatus: "pending",
                        totalPrice: 50,
                        reservationDate: new Date(reservationDate),
                        reservationTime,
                    })
                    .returning({ id: PreOrderTable.id });

                await trx.insert(PreOrderInfoTable).values(
                    tableId.map((tableId: string) => ({
                        preOrderId: result.id,
                        tableId,
                    }))
                );

                return preOrder;
            });

            return c.json(
                { message: "Reservation created successfully", result },
                200
            );
        } catch (error) {
            console.log(error);
            return c.json({ message: "Internal server error", error }, 500);
        }
    }
);

export default reservationRoute;
