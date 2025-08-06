import { z } from 'zod';

export const updateActiveSchema = z.object({
    customerName: z.string().min(1, { message: 'กรุณากรอกชื่อลูกค้า' }),
    customerPhone: z
        .string()
        .optional()
        .refine(val => !val || val.length === 10, {
            message: 'กรุณากรอกหมายเลขโทรศักท์ให้ครบ10ตัว',
        }),
    adultNumber: z.coerce
        .number({
            required_error: 'กรุณากรอกจำนวนผู้ใหญ่',
            invalid_type_error: 'กรุณากรอกจำนวนผู้ใหญ่',
        })
        .min(1, 'จำนวนผู้ใหญ่ต้องไม่เท่ากับ 0'),

    childNumber: z.coerce
        .number({
            invalid_type_error: 'กรุณากรอกจำนวนเด็ก',
        })
        .min(0, 'จำนวนเด็กต้องไม่น้อยกว่า 0')
        .optional(),
});

export type updateActiveSchemaType = z.infer<typeof updateActiveSchema>;
