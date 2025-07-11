import { cn } from "@/lib/utils";
import React from "react";
import { TableStateType } from "../type";

type TableCardProps = {
    tableId: string;
    tableNumber: string;
    selectedTables: TableStateType[];
    setSelectedTables: React.Dispatch<React.SetStateAction<TableStateType[]>>;
    isAvailable: boolean;
};

function TableCard({
    tableId,
    tableNumber,
    selectedTables,
    setSelectedTables,
    isAvailable,
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
            disabled={!isAvailable}
            onClick={handleSelectTable}
            className={cn(
                "bg-green-500 size-full border border-black rounded-md p-4 flex items-center justify-center",
                isSelected && "bg-coffee-dark text-coffee-light",
                !isAvailable &&
                    "bg-red-500 border-black text-white cursor-not-allowed"
            )}
        >
            {tableNumber}
        </button>
    );
}

export default TableCard;
