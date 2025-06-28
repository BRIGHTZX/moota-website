import { z } from "zod";

export const insertPreOrderSchema = z.object({
    customerName: z.string().min(1, "กรุณากรอกชื่อผู้จอง"),
    phoneNumber: z
        .string()
        .min(1, "กรุณากรอกเบอร์โทรศัพท์")
        .max(10, "กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง 10 หลัก"),
    email: z
        .string()
        .trim()
        .transform((val) => (val === "" ? null : val))
        .nullable()
        .optional()
        .refine(
            (val) =>
                val === null || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val ?? ""),
            {
                message: "กรุณากรอกอีเมลให้ถูกต้อง",
            }
        ),
    tableNumber: z.string().min(1, "กรุณากรอกโต๊ะที่"),
    tableType: z.enum(["inside", "outside"]),
    adultNumber: z.number().min(0),
    childNumber: z.number().min(0),
    totalPrice: z.number().min(1),
    status: z.enum(["pending", "confirmed", "cancelled"]),
    reservationDate: z.date().refine(
        (date) => {
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            const selected = new Date(date);
            selected.setHours(0, 0, 0, 0);

            return selected >= today;
        },
        {
            message: "วันที่จองต้องเป็นวันที่ในอนาคต",
        }
    ),
    reservationTime: z.string().min(1, "กรุณากรอกเวลาจอง"),
});

export type insertPreOrderSchemaType = z.infer<typeof insertPreOrderSchema>;
