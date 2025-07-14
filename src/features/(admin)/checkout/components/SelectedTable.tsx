import { ActiveInfo, SelectedTable } from "@/features/(admin)/checkout/types";
import { cn } from "@/lib/utils";

type TableSelectorProps = {
    tables: ActiveInfo;
    selectedTable: SelectedTable[];
    setSelectedTable: (table: SelectedTable[]) => void;
};

const TableSelector = ({
    tables,
    selectedTable,
    setSelectedTable,
}: TableSelectorProps) => {
    const isSelected = selectedTable.some(
        (t) => t.activeInfoId === tables.activeInfoId
    );

    const handleSelectedTable = (table: SelectedTable) => {
        const isAlreadySelected = selectedTable.some(
            (t) => t.activeInfoId === table.activeInfoId
        );

        if (isAlreadySelected) {
            // ถ้าเลือกไว้แล้ว → เอาออก
            const filtered = selectedTable.filter(
                (t) => t.activeInfoId !== table.activeInfoId
            );
            setSelectedTable(filtered);
        } else {
            setSelectedTable([...selectedTable, table]);
        }
    };
    return (
        <div
            onClick={() => {
                handleSelectedTable(tables);
            }}
            className={cn(
                "border border-gray-300 shadow-sm rounded-md p-4 bg-white w-full flex items-center justify-center",
                isSelected && "bg-blue-500 text-white"
            )}
        >
            <p className="text-sm font-bold">{tables.tableNumber}</p>
        </div>
    );
};

export default TableSelector;
