import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { getCurrentUser } from "@/services/middleware-hono";

import { db } from "@/database/db";
import { insertPreOrderWithoutTableIdSchema } from "../schema";
import {
    preOrder as PreOrderTable,
    preOrderInfo as PreOrderInfoTable,
} from "@/database/schema/pre-order";
import { table as TalbesTable } from "@/database/schema/table";
import { z } from "zod";
import { generateOrderNumber } from "@/lib/generateOrderNumber";
import { and, eq } from "drizzle-orm";
import { connectCloudinary } from "@/lib/cloudinary";

const reservationRoute = new Hono()
    .get("/:preOrderId", getCurrentUser, async (c) => {
        const user = c.get("user");

        if (!user) {
            return c.json({ message: "Unauthorized" }, 401);
        }

        try {
            const preOrderId = c.req.param("preOrderId");

            const preOrders = await db
                .select({
                    preOrder: {
                        id: PreOrderTable.id,
                        preOrderNumber: PreOrderTable.preOrderNumber,
                        customerName: PreOrderTable.customerName,
                        phoneNumber: PreOrderTable.phoneNumber,
                        adultNumber: PreOrderTable.adultNumber,
                        childNumber: PreOrderTable.childNumber,
                        totalPrice: PreOrderTable.totalPrice,
                        reservationDate: PreOrderTable.reservationDate,
                        reservationTime: PreOrderTable.reservationTime,
                        status: PreOrderTable.status,
                        paymentStatus: PreOrderTable.paymentStatus,
                        paymentImage: PreOrderTable.paymentImage,
                        createdAt: PreOrderTable.createdAt,
                    },
                    table: {
                        id: PreOrderInfoTable.tableId,
                        tableNumber: TalbesTable.tableNumber,
                    },
                })
                .from(PreOrderTable)
                .leftJoin(
                    PreOrderInfoTable,
                    eq(PreOrderTable.id, PreOrderInfoTable.preOrderId)
                )
                .leftJoin(
                    TalbesTable,
                    eq(PreOrderInfoTable.tableId, TalbesTable.id)
                )
                .where(
                    and(
                        eq(PreOrderTable.id, preOrderId),
                        eq(PreOrderTable.userKindeId, user.id.toString())
                    )
                );

            if (!preOrders.length) {
                return c.json({ message: "Reservation not found" }, 404);
            }

            const formattedPreOrder = {
                ...preOrders[0].preOrder,
                table: preOrders.map((row) => ({
                    id: row.table.id!,
                    tableNumber: row.table.tableNumber!,
                })),
            };

            return c.json(
                {
                    message: "Reservation fetched successfully",
                    result: formattedPreOrder,
                },
                200
            );
        } catch (error) {
            console.log(error);
            return c.json({ message: "Internal server error", error }, 500);
        }
    })
    .post(
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
                    tableId,
                    adultNumber,
                    childNumber,
                    reservationDate,
                    reservationTime,
                } = c.req.valid("json");

                const preOrderNumber = generateOrderNumber();

                const preOrderReturn = await db.transaction(async (trx) => {
                    const [inserted] = await trx
                        .insert(PreOrderTable)
                        .values({
                            preOrderNumber,
                            userKindeId: user.id.toString(),
                            customerName,
                            phoneNumber,
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
                            preOrderId: inserted.id,
                            tableId,
                        }))
                    );

                    return inserted;
                });

                return c.json(
                    {
                        message: "Reservation created successfully",
                        result: preOrderReturn,
                    },
                    200
                );
            } catch (error) {
                console.log(error);
                return c.json({ message: "Internal server error", error }, 500);
            }
        }
    )
    .patch(
        "/:preOrderId",
        getCurrentUser,
        zValidator(
            "form",
            z.object({
                paymentImage: z.any(),
            })
        ),
        async (c) => {
            const user = c.get("user");

            if (!user) {
                return c.json({ message: "Unauthorized" }, 401);
            }

            try {
                const preOrderId = c.req.param("preOrderId");
                const { paymentImage } = c.req.valid("form");

                const cloundinaryInstance = await connectCloudinary();

                const imageUrl = await (async (): Promise<string> => {
                    if (paymentImage instanceof File) {
                        const arrayBuffer = await paymentImage.arrayBuffer();
                        const buffer = Buffer.from(arrayBuffer);
                        const result =
                            await cloundinaryInstance.uploader.upload(
                                "data:" +
                                    paymentImage.type +
                                    ";base64," +
                                    buffer.toString("base64"),
                                {
                                    resource_type: "image",
                                }
                            );
                        return result.secure_url;
                    } else if (paymentImage && paymentImage.path) {
                        const result =
                            await cloundinaryInstance.uploader.upload(
                                paymentImage.path,
                                {
                                    resource_type: "image",
                                }
                            );
                        return result.secure_url;
                    }

                    throw new Error("รูปภาพหลักฐานการชำระเงินไม่ถูกต้อง");
                })();

                await db
                    .update(PreOrderTable)
                    .set({ paymentStatus: "paid", paymentImage: imageUrl })
                    .where(
                        and(
                            eq(PreOrderTable.id, preOrderId),
                            eq(PreOrderTable.userKindeId, user.id.toString())
                        )
                    );

                return c.json(
                    {
                        message: "Reservation updated successfully",
                    },
                    200
                );
            } catch (error) {
                console.log(error);
                return c.json({ message: "Internal server error", error }, 500);
            }
        }
    );

export default reservationRoute;
