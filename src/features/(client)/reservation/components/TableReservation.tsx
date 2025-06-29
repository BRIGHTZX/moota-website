import { cn } from "@/lib/utils";
import React from "react";

function TableReservation({
    arrayTable,
    setArrayTable,
}: {
    arrayTable: string[];
    setArrayTable: (arrayTable: string[]) => void;
}) {
    const handleSelectTable = (tableNumber: string) => {
        if (arrayTable.includes(tableNumber)) {
            // เอาออกถ้าเลือกอยู่
            setArrayTable(arrayTable.filter((t) => t !== tableNumber));
        } else {
            // เพิ่มถ้ายังไม่ถูกเลือก
            setArrayTable([...arrayTable, tableNumber]);
        }
    };

    const insideTables = Array.from({ length: 20 }, (_, i) => `${i + 1}`);
    const outsideTables = Array.from({ length: 30 }, (_, i) => `${i + 21}`);

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
                            {insideTables.slice(0, 15).map((tableNumber) => (
                                <TableCard
                                    key={tableNumber}
                                    tableNumber={tableNumber}
                                    tableType="inside"
                                    isAvailable={true}
                                    isSelected={arrayTable.includes(
                                        tableNumber
                                    )}
                                    onSelect={handleSelectTable}
                                />
                            ))}
                        </div>

                        <div>
                            <p>ด้านนอกหลังคา</p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {insideTables.slice(15).map((tableNumber) => (
                                <TableCard
                                    key={tableNumber}
                                    tableNumber={tableNumber}
                                    tableType="inside"
                                    isAvailable={true}
                                    isSelected={arrayTable.includes(
                                        tableNumber
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
                        {outsideTables.map((tableNumber) => (
                            <TableCard
                                key={tableNumber}
                                tableNumber={tableNumber}
                                tableType="outside"
                                isAvailable={true}
                                isSelected={arrayTable.includes(tableNumber)}
                                onSelect={handleSelectTable}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TableReservation;

type TableCardProps = {
    tableNumber: string;
    tableType: string;
    isAvailable: boolean;
    isSelected: boolean;
    onSelect: (tableNumber: string) => void;
};

const TableCard = ({
    tableNumber,
    tableType,
    isAvailable,
    isSelected,
    onSelect,
}: TableCardProps) => {
    return (
        <div
            onClick={() => onSelect(tableNumber)}
            className={cn(
                "flex w-[50px] h-[40px] flex-col items-center justify-center border border-gray-300 rounded-lg cursor-pointer transition",
                !isAvailable && "bg-red-300",
                isAvailable &&
                    (isSelected ? "bg-coffee-dark text-white" : "bg-white")
            )}
        >
            <p className="text-xl font-bold">{tableNumber}</p>
        </div>
    );
};
