import { DateModeType } from "@/features/(owner)/dashboard/types";
import { format } from "date-fns";
import { th } from "date-fns/locale";

export function groupData<T extends { updatedAt: Date; totalAmount?: number }>(
    data: T[],
    groupBy: DateModeType
) {
    const grouped: Record<string, number> = {};

    for (const item of data) {
        const key = format(
            item.updatedAt,
            groupBy === "month" ? "MMM yyyy" : "dd MMM",
            { locale: th }
        );
        const value = item.totalAmount ?? 0;
        grouped[key] = (grouped[key] ?? 0) + value;
    }

    return Object.entries(grouped).map(([date, total]) => ({
        date,
        total,
    }));
}
