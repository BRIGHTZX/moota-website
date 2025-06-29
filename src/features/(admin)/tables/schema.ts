import { z } from "zod";

export const selectTablesSchema = z.object({
    id: z.string().uuid(),
    tableNumber: z.string(),
    tableType: z.string(),
    isAvailable: z.boolean(),
});

export type selectTablesSchemaType = z.infer<typeof selectTablesSchema>;
