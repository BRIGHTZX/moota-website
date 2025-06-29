import { useGetTables } from "@/features/(admin)/tables/api/use-get-tables";
import { selectTablesSchemaType } from "@/features/(admin)/tables/schema";
import { cn } from "@/lib/utils";
import React from "react";

function TableReservation({
    arrayTable,
    setArrayTable,
}: {
    arrayTable: string[];
    setArrayTable: (arrayTable: string[]) => void;
}) {
    const { data: tables, isLoading } = useGetTables();
    const tablesData = tables?.tables;
    console.log(tablesData);
    console.log(arrayTable);

    const insideTables = tablesData?.filter(
        (table: selectTablesSchemaType) => table.tableType === "inside"
    );

    const outsideTables = tablesData?.filter(
        (table: selectTablesSchemaType) => table.tableType === "outside"
    );

    const handleSelectTable = (tableId: string, isAvailable: boolean) => {
        if (!isAvailable) return;
        if (arrayTable.includes(tableId)) {
            setArrayTable(arrayTable.filter((t) => t !== tableId));
        } else {
            setArrayTable([...arrayTable, tableId]);
        }
    };

    if (isLoading) return <div>Loading...</div>;

    return (
        <div className="mt-10 flex flex-col sm:flex-row">
            {/* INSIDE */}
            <div className="flex flex-1 flex-wrap gap-4">
                <div className="flex size-full flex-col gap-4">
                    <div>
                        <p className="text-2xl text-center font-bold">ด้านใน</p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div>
                            <p>ด้านในหลังคา</p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {insideTables?.length &&
                                insideTables
                                    .slice(0, 15)
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
                                    .slice(15)
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
            <div className="flex flex-1 mt-4 sm:mt-0 gap-4">
                <div className="flex size-full flex-col gap-4">
                    <div>
                        <p className="text-2xl text-center font-bold">
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
                "flex w-[50px] h-[40px] flex-col items-center justify-center border border-gray-300 rounded-lg cursor-pointer transition",
                !isAvailable && "bg-red-400 opacity-50 cursor-not-allowed",
                isAvailable &&
                    (isSelected ? "bg-coffee-dark text-white" : "bg-white")
            )}
        >
            <p className="text-xl font-bold">{tableNumber}</p>
        </div>
    );
};
