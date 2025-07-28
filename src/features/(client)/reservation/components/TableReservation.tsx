import PageLoader from '@/components/PageLoader';
import { useGetTables } from '@/features/(client)/reservation/api/use-get-tables';
import { selectTablesSchemaType } from '@/features/(admin)/tables/schema';
import { cn } from '@/lib/utils';
import React from 'react';
import ErrorPage from '@/components/errors/ErrorPage';

function TableReservation({
    arrayTable,
    setArrayTable,
}: {
    arrayTable: string[];
    setArrayTable: (arrayTable: string[]) => void;
}) {
    const { data: tables, isLoading, isError } = useGetTables();
    const tablesData = tables;

    const insideTables = tablesData?.filter(
        (table: selectTablesSchemaType) => table.tableType === 'inside'
    );

    const outsideTables = tablesData?.filter(
        (table: selectTablesSchemaType) => table.tableType === 'outside'
    );

    const handleSelectTable = (tableId: string, isAvailable: boolean) => {
        if (!isAvailable) return;
        if (arrayTable.includes(tableId)) {
            setArrayTable(arrayTable.filter(t => t !== tableId));
        } else {
            setArrayTable([...arrayTable, tableId]);
        }
    };

    if (isLoading) return <PageLoader className="h-[200px]" />;
    if (isError) return <ErrorPage />;

    return (
        <div className="mt-10 flex flex-col sm:flex-row">
            {/* INSIDE */}
            <div className="flex flex-1 flex-wrap gap-4">
                <div className="flex size-full flex-col gap-4">
                    <div>
                        <p className="text-center text-2xl font-bold">ด้านใน</p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div>
                            <p>ด้านในหลังคา</p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {insideTables?.length &&
                                insideTables
                                    .filter(
                                        (table: selectTablesSchemaType) =>
                                            Number(table.tableNumber) >= 1 &&
                                            Number(table.tableNumber) <= 15
                                    )
                                    .map((table: selectTablesSchemaType) => (
                                        <TableCard
                                            key={table.id}
                                            tableId={table.id}
                                            tableNumber={table.tableNumber}
                                            isAvailable={table.isAvailable}
                                            isSelected={arrayTable.includes(
                                                table.id
                                            )}
                                            onSelect={handleSelectTable}
                                        />
                                    ))}
                        </div>

                        <div>
                            <p>ด้านนอกหลังคา</p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {insideTables?.length &&
                                insideTables
                                    .filter(
                                        (table: selectTablesSchemaType) =>
                                            Number(table.tableNumber) >= 16 &&
                                            Number(table.tableNumber) <= 20
                                    )
                                    .map((table: selectTablesSchemaType) => (
                                        <TableCard
                                            key={table.id}
                                            tableId={table.id}
                                            tableNumber={table.tableNumber}
                                            isAvailable={table.isAvailable}
                                            isSelected={arrayTable.includes(
                                                table.id
                                            )}
                                            onSelect={handleSelectTable}
                                        />
                                    ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* OUTSIDE */}
            <div className="mt-4 flex flex-1 gap-4 sm:mt-0">
                <div className="flex size-full flex-col gap-4">
                    <div>
                        <p className="text-center text-2xl font-bold">
                            ด้านนอก
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {outsideTables?.length &&
                            outsideTables.map(
                                (table: selectTablesSchemaType) => (
                                    <TableCard
                                        key={table.id}
                                        tableId={table.id}
                                        tableNumber={table.tableNumber}
                                        isAvailable={table.isAvailable}
                                        isSelected={arrayTable.includes(
                                            table.id
                                        )}
                                        onSelect={handleSelectTable}
                                    />
                                )
                            )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TableReservation;

type TableCardProps = {
    tableId: string;
    tableNumber: string;
    isAvailable: boolean;
    isSelected: boolean;
    onSelect: (tableId: string, isAvailable: boolean) => void;
};

const TableCard = ({
    tableId,
    tableNumber,
    isAvailable,
    isSelected,
    onSelect,
}: TableCardProps) => {
    return (
        <div
            onClick={() => onSelect(tableId, isAvailable)}
            className={cn(
                'flex h-[40px] w-[50px] cursor-pointer flex-col items-center justify-center rounded-lg border border-gray-300 transition',
                !isAvailable && 'cursor-not-allowed bg-red-500',
                isAvailable &&
                    (isSelected ? 'bg-coffee-dark text-white' : 'bg-white')
            )}
        >
            <p className="text-xl font-bold">{tableNumber}</p>
        </div>
    );
};
