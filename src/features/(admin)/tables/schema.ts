import { z } from "zod";

export const selectTablesSchema = z.object({
    id: z.string(),
    tableNumber: z.string(),
    tableType: z.string(),
    isAvailable: z.boolean(),
});

export type selectTablesSchemaType = z.infer<typeof selectTablesSchema>;

export const insertTalblesSchema = z.object({
    customerName: z.string().min(1, { message: "กรุณากรอกชื่อลูกค้า" }),
    customerPhone: z
        .string()
        .optional()
        .refine((val) => !val || val.length === 10, {
            message: "กรุณากรอกหมายเลขโทรศักท์ให้ครบ10ตัว",
        }),
    adultNumber: z.coerce
        .number({
            required_error: "กรุณากรอกจำนวนผู้ใหญ่",
            invalid_type_error: "กรุณากรอกจำนวนผู้ใหญ่เป็นตัวเลข",
        })
        .min(1, "จำนวนผู้ใหญ่ต้องไม่เท่ากับ 0"),

    childNumber: z.coerce
        .number({
            invalid_type_error: "กรุณากรอกจำนวนเด็กเป็นตัวเลข",
        })
        .min(0, "จำนวนเด็กต้องไม่น้อยกว่า 0"),
});

export type insertTalblesSchemaType = z.infer<typeof insertTalblesSchema>;
