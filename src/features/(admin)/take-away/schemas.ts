import { z } from 'zod';

export const insertTakeAwaySchema = z.object({
    totalPrice: z.number().min(1, 'กรุณาระบุจำนวนเงิน'),
    paymentMethod: z.enum(['cash', 'promptpay'], {
        message: 'กรุณากรอกช่องทางการจ่ายเงิน',
    }),
});

export type InsertTakeAwaySchemaType = z.infer<typeof insertTakeAwaySchema>;
