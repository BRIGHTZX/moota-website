import { cn } from "@/lib/utils";
import React from "react";
import { TableStateType } from "../type";

type TableCardProps = {
    tableId: string;
    tableNumber: string;
    selectedTables: TableStateType[];
    setSelectedTables: React.Dispatch<React.SetStateAction<TableStateType[]>>;
};

function TableCard({
    tableId,
    tableNumber,
    selectedTables,
    setSelectedTables,
}: TableCardProps) {
    const isSelected = selectedTables.some((t) => t.tableId === tableId);
    const handleSelectTable = () => {
        if (isSelected) {
            // เอาออก
            setSelectedTables(
                selectedTables.filter((t) => t.tableId !== tableId)
            );
        } else {
            // เพิ่มเข้า (แปลง tableNumber เป็น number ถ้าต้องการเก็บเป็นตัวเลข)
            setSelectedTables([
                ...selectedTables,
                { tableId, tableNumber: Number(tableNumber) },
            ]);
        }
    };
    return (
        <button
            onClick={handleSelectTable}
            className={cn(
                "bg-coffee-light size-full border border-coffee-dark rounded-md p-4 flex items-center justify-center",
                isSelected && "bg-coffee-dark text-coffee-light"
            )}
        >
            {tableNumber}
        </button>
    );
}

export default TableCard;
