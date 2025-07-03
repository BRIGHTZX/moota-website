"use client";
import TextHeader from "@/components/TextHeader";
import TableCard from "@/features/(admin)/tables/components/TableCard";
import { useGetAdminTables } from "@/features/(admin)/tables/api/use-get-admin-tables";
import PageLoader from "@/components/PageLoader";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";
import AddTableForm from "@/features/(admin)/tables/components/AddTableForm";
import { TableStateType } from "@/features/(admin)/tables/type";

function TablesPage() {
    const [selectedTables, setSelectedTables] = useState<TableStateType[]>([]);
    const [isOpenAddTableForm, setIsOpenAddTableForm] =
        useState<boolean>(false);

    const { data: tables, isLoading, isError } = useGetAdminTables();

    if (isLoading) return <PageLoader />;
    if (isError) return <div>Error</div>;

    return (
        <div className="p-4 pt-20 pb-8 relative h-[calc(100vh-5rem)]  overflow-y-auto">
            <div className="flex items-center gap-2">
                <TextHeader text="ระบบโต๊ะ" />
            </div>

            <div className="mt-4">
                <p className="text-coffee-dark text-center text-lg font-bold">
                    โซนนอก
                </p>
                <div className="mt-4 grid grid-cols-3 justify-items-center gap-4">
                    {tables?.tables
                        .filter((t) => t.tableType === "inside")
                        .map((t) => (
                            <TableCard
                                key={t.id}
                                tableId={t.id}
                                tableNumber={t.tableNumber}
                                selectedTables={selectedTables}
                                setSelectedTables={setSelectedTables}
                            />
                        ))}
                </div>
            </div>

            <div className="mt-4">
                <p className="text-coffee-dark text-center text-lg font-bold">
                    โซนนอก
                </p>
                <div className="mt-4 grid grid-cols-3 justify-items-center gap-4">
                    {tables?.tables
                        .filter((t) => t.tableType === "outside")
                        .map((t) => (
                            <TableCard
                                key={t.id}
                                tableId={t.id}
                                tableNumber={t.tableNumber}
                                selectedTables={selectedTables}
                                setSelectedTables={setSelectedTables}
                            />
                        ))}
                </div>
            </div>

            {/* Traslate Button */}
            <div
                className={cn(
                    "sticky mt-4 -bottom-4 flex transition-all duration-300 justify-center backdrop-blur-lg border rounded-md p-4",
                    selectedTables.length === 0 &&
                        "opacity-0 translate-y-8 pointer-events-none"
                )}
            >
                <Button
                    variant="coffeePrimary"
                    className="w-full"
                    onClick={() => setIsOpenAddTableForm(true)}
                >
                    เปิด {selectedTables.length} โต๊ะ
                </Button>
            </div>

            <AddTableForm
                selectedTables={selectedTables}
                isOpen={isOpenAddTableForm}
                setIsOpen={setIsOpenAddTableForm}
            />
        </div>
    );
}

export default TablesPage;
