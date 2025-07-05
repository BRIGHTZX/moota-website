import { z } from "zod";

export const importExportProductSchema = z.object({
    stock: z.coerce.number().min(1, "กรุณากรอกจำนวนสินค้า"),
    type: z.enum(["import", "export"]),
});

export type importExportProductSchemaType = z.infer<
    typeof importExportProductSchema
>;
