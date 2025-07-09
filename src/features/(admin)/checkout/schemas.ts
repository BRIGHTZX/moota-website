import { z } from "zod";
import { checkoutStatus } from "./types";

export const getOrderListSchema = z.object({
    activeInfoId: z.array(z.string()),
});

export type GetOrderListSchema = z.infer<typeof getOrderListSchema>;

export const insertCheckoutSchema = z.object({
    activeInfoId: z.array(z.string()),
    tableId: z.array(z.string()),
    customerName: z.string(),
    paidAdultNumber: z.number(),
    paidChildNumber: z.number(),
    totalOrderPrice: z.number(),
    totalDiscount: z.number(),
    totalAmount: z.number(),
    paymentMethod: z.string(),
    status: z.enum(checkoutStatus),
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
