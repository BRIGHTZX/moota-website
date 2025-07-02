import { cn } from "@/lib/utils";
import React from "react";

type TableCardProps = {
    tableNumber: string;
    selectedTables: string[];
    setSelectedTables: (tables: string[]) => void;
};

function TableCard({
    tableNumber,
    selectedTables,
    setSelectedTables,
}: TableCardProps) {
    const isSelected = selectedTables?.includes(tableNumber);
    const handleSelectTable = () => {
        if (isSelected) {
            setSelectedTables(selectedTables.filter((t) => t !== tableNumber));
        } else {
            setSelectedTables([...selectedTables, tableNumber]);
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
