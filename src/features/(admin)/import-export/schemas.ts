import { z } from "zod";

export const importExportProductSchema = z
    .object({
        stock: z.coerce.number().min(1, "กรุณากรอกจำนวนสินค้า"),
        totalPrice: z.coerce.number().optional(),
        type: z.enum(["import", "export"]),
    })
    .refine(
        (data) => {
            if (data.type === "import") {
                return data.totalPrice !== undefined && data.totalPrice >= 1;
            }
            return true;
        },
        {
            message: "กรุณากรอกราคารวม",
            path: ["totalPrice"],
        }
    );

export type importExportProductSchemaType = z.infer<
    typeof importExportProductSchema
>;
