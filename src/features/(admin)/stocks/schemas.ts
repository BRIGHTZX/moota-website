import { z } from 'zod';

export const insertStockProductSchema = z.object({
    name: z.string().min(1, 'กรุณากรอกชื่อสินค้า'),
    image: z.instanceof(File, { message: 'กรุณากรอกรูปภาพสินค้า' }),
    unit: z.string().min(1, 'กรุณากรอกหน่วยสินค้า'),
    category: z.string().min(1, 'กรุณากรอกหมวดหมู่'),
    price: z.coerce.number().min(0, 'กรุณากรอกราคาสินค้า'),
    limitAlert: z.coerce
        .number()
        .min(0, 'กรุณากรอกจำนวนสินค้าที่ต้องการแจ้งเตือน')
        .optional(),
});

export type insertStockProductSchemaType = z.infer<
    typeof insertStockProductSchema
>;

export type selectStockProductSchemaType = {
    id: string;
    products: {
        name: string;
        image: string;
    };
    stocks: {
        stock: number;
        unit: string;
    };
};

const fileOrUrlSchema = z.union([
    z.instanceof(File), // รูปใหม่จาก input type="file"
    z.string().trim().url({ message: 'รูปภาพต้องเป็น URL ที่ถูกต้อง' }),
]);

export const updateStockProductSchema = z.object({
    name: z.string().min(1, 'กรุณากรอกชื่อสินค้า'),
    image: fileOrUrlSchema,
    unit: z.string().min(1, 'กรุณากรอกหน่วยสินค้า'),
    category: z.string().min(1, 'กรุณากรอกหมวดหมู่'),
    price: z.coerce.number().min(0, 'กรุณากรอกราคาสินค้า'),
    limitAlert: z.coerce
        .number()
        .min(0, 'กรุณากรอกจำนวนสินค้าที่ต้องการแจ้งเตือน')
        .optional(),
});

export type updateStockProductSchemaType = z.infer<
    typeof updateStockProductSchema
>;

export const deleteStockProductSchema = z.object({
    productId: z.string(),
});

export type deleteStockProductSchemaType = z.infer<
    typeof deleteStockProductSchema
>;
