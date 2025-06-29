import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { getCurrentUser } from "@/services/middleware-hono";

import { db } from "@/database/db";
import { insertPreOrderSchema } from "../schema";
import { preOrder as PreOrderTable } from "@/database/schema/pre-order";

const reservationRoute = new Hono().post(
    "/",
    getCurrentUser,
    zValidator("form", insertPreOrderSchema),
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
                tableNumber,
                tableType,
                adultNumber,
                childNumber,
                reservationDate,
                reservationTime,
            } = c.req.valid("form");

            const [result] = await db
                .insert(PreOrderTable)
                .values({
                    userKindeId: user.id.toString(),
                    customerName,
                    phoneNumber,
                    email,
                    tableNumber,
                    tableType,
                    adultNumber: parseInt(adultNumber),
                    childNumber: parseInt(childNumber),
                    totalPrice: 50,
                    reservationDate: new Date(reservationDate),
                    reservationTime,
                    status: "pending",
                    paymentStatus: "pending",
                })
                .returning({ id: PreOrderTable.id });

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
