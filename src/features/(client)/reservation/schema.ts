import { z } from "zod";

export const insertPreOrderWithoutTableIdSchema = z.object({
    customerName: z.string().min(1, "กรุณากรอกชื่อผู้จอง"),
    phoneNumber: z
        .string()
        .length(10, "กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง 10 หลัก"),
    email: z
        .string()
        .trim()
        .optional()
        .refine((val) => !val || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), {
            message: "กรุณากรอกอีเมลให้ถูกต้อง",
        }),
    adultNumber: z.coerce
        .number({
            required_error: "กรุณากรอกจำนวนผู้ใหญ่",
            invalid_type_error: "กรุณากรอกจำนวนผู้ใหญ่เป็นตัวเลข",
        })
        .min(0, "จำนวนผู้ใหญ่ต้องไม่น้อยกว่า 0"),

    childNumber: z.coerce
        .number({
            invalid_type_error: "กรุณากรอกจำนวนเด็กเป็นตัวเลข",
        })
        .min(0, "จำนวนเด็กต้องไม่น้อยกว่า 0"),
    reservationDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: "กรุณากรอกวันที่ให้ถูกต้อง",
    }),
    reservationTime: z.string().min(1, "กรุณากรอกเวลาจอง"),
});

export const insertPreOrderSchema =
    insertPreOrderWithoutTableIdSchema.superRefine((data, ctx) => {
        if ((data.adultNumber ?? 0) === 0 && (data.childNumber ?? 0) === 0) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "กรุณากรอกจำนวน",
                path: ["adultNumber"],
            });
        }
    });
export type insertPreOrderSchemaType = z.infer<typeof insertPreOrderSchema>;
