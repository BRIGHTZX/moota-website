import { z } from "zod";

export const orderItemSchema = z.object({
    product: z.object({
        id: z.string().uuid(),
        price: z.number(),
    }),
    quantity: z.number().min(1),
});

export const insertOrderSchema = z.object({
    activeInfoId: z.string().uuid(),
    totalPrice: z.number(),
    orderList: z.array(orderItemSchema),
});
