import { z } from "zod";

export const dateRangeSchema = z.object({
    startDate: z.string(),
    endDate: z.string(),
});
