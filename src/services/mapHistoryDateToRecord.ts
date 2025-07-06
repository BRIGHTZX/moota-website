import { HistoryRecordType } from "@/features/(admin)/import-export/types";

export const mapHistoryDateToRecord = (history: HistoryRecordType[]) => {
    return history.reduce<Record<string, HistoryRecordType[]>>((acc, row) => {
        // Get the *date* portion in local time; adjust if you prefer UTC
        const key = new Date(row.updatedAt).toISOString().split("T")[0];
        (acc[key] ??= []).push(row);
        return acc;
    }, {});
};
