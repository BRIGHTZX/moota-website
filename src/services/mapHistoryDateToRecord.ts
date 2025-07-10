export const mapHistoryDateToRecord = <T extends { updatedAt: string }>(
    history: T[]
) => {
    return history.reduce<Record<string, T[]>>((acc, row) => {
        // Get the *date* portion in local time; adjust if you prefer UTC
        const key = new Date(row.updatedAt).toISOString().split("T")[0];
        (acc[key] ??= []).push(row);
        return acc;
    }, {});
};
