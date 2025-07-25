import { db } from '@/database/db';
import { activeInfo as ActiveInfoTable } from '@/database/schema/active';
import { eq } from 'drizzle-orm';

export const getTableNumber = async (activeInfoId: string) => {
    const activeInfo = await db.query.activeInfo.findFirst({
        columns: {
            tableId: true,
        },
        with: {
            diningTable: {
                columns: {
                    tableNumber: true,
                },
            },
        },
        where: eq(ActiveInfoTable.id, activeInfoId),
    });

    return activeInfo?.diningTable.tableNumber;
};
