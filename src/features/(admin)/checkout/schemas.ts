import { z } from "zod";

export const getOrderListSchema = z.object({
    activeInfoId: z.array(z.string()),
});

export type GetOrderListSchema = z.infer<typeof getOrderListSchema>;

export const insertCheckoutSchema = z.object({
    activeInfoId: z.array(z.string()),
    customerName: z.string(),
    paidAdultNumber: z.number(),
    paidChildNumber: z.number(),
    totalOrderPrice: z.number(),
    totalDiscount: z.number(),
    totalAmount: z.number(),
    paymentMethod: z.string(),
    orderList: z.array(
        z.object({
            productId: z.string(),
            quantity: z.number(),
            pricePerUnit: z.number(),
            totalPrice: z.number(),
        })
    ),
});

export type insertCheckoutSchemaType = z.infer<typeof insertCheckoutSchema>;
