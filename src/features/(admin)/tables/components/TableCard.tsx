import { cn } from '@/lib/utils';
import React from 'react';
import { TableStateType } from '../type';

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
    const isSelected = selectedTables.some(t => t.tableId === tableId);
    const handleSelectTable = () => {
        if (isSelected) {
            // เอาออก
            setSelectedTables(
                selectedTables.filter(t => t.tableId !== tableId)
            );
        } else {
            // เพิ่มเข้า (แปลง tableNumber เป็น number ถ้าต้องการเก็บเป็นตัวเลข)
            setSelectedTables([...selectedTables, { tableId, tableNumber }]);
        }
    };
    return (
        <button
            disabled={!isAvailable}
            onClick={handleSelectTable}
            className={cn(
                'flex size-full items-center justify-center rounded-md border border-black bg-green-500 p-4',
                isSelected && 'bg-green-700 text-white',
                !isAvailable &&
                    'cursor-not-allowed border-black bg-red-500 text-white'
            )}
        >
            {tableNumber}
        </button>
    );
}

export default TableCard;
