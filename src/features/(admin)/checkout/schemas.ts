import { z } from "zod";

export const getOrderListSchema = z.object({
    activeInfoId: z.array(z.string()),
});

export type GetOrderListSchema = z.infer<typeof getOrderListSchema>;
