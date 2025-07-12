import { z } from "zod";

export const importExportProductSchema = z.object({
    stock: z.coerce.number().min(1, "กรุณากรอกจำนวนสินค้า"),
    totalPrice: z.coerce.number().min(1, "กรุณากรอกราคารวม"),
    type: z.enum(["import", "export"]),
});

export type importExportProductSchemaType = z.infer<
    typeof importExportProductSchema
>;
