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
import AdminPageWrapper from "@/components/AdminPageWrapper";

function TablesPage() {
    const [selectedTables, setSelectedTables] = useState<TableStateType[]>([]);
    const [isOpenAddTableForm, setIsOpenAddTableForm] =
        useState<boolean>(false);

    const { data: tables, isLoading, isError } = useGetAdminTables();

    const tablesInside = tables?.tables.filter((t) => t.tableType === "inside");
    const tablesOutside = tables?.tables.filter(
        (t) => t.tableType === "outside"
    );

    if (isLoading) return <PageLoader />;
    if (isError) return <div>Error</div>;

    return (
        <AdminPageWrapper>
            <div className="flex items-center gap-2">
                <TextHeader text="ระบบโต๊ะ" />
            </div>

            <div className="mt-4">
                <p className="text-black text-center text-lg font-bold">
                    โซนใน
                </p>
                <div className="mt-4 grid grid-cols-3 justify-items-center gap-4">
                    {tablesInside?.length === 0 ? (
                        <div className="col-span-3">
                            <p className="text-gray-500 text-center text-md">
                                ไม่มีโต๊ะที่พร้อมใช้งานในโซนนี้
                            </p>
                        </div>
                    ) : (
                        tablesInside?.map((t) => (
                            <TableCard
                                key={t.id}
                                tableId={t.id}
                                tableNumber={t.tableNumber}
                                selectedTables={selectedTables}
                                setSelectedTables={setSelectedTables}
                                isAvailable={t.isAvailable}
                            />
                        ))
                    )}
                </div>
            </div>

            <div className="mt-4">
                <p className="text-black text-center text-lg font-bold">
                    โซนนอก
                </p>
                <div className="mt-4 grid grid-cols-3 justify-items-center gap-4">
                    {tablesOutside?.length === 0 ? (
                        <div className="col-span-3">
                            <p className="text-gray-500 text-center text-md">
                                ไม่มีโต๊ะที่พร้อมใช้งานในโซนนี้
                            </p>
                        </div>
                    ) : (
                        <>
                            {tablesOutside?.map((t) => (
                                <TableCard
                                    key={t.id}
                                    tableId={t.id}
                                    tableNumber={t.tableNumber}
                                    selectedTables={selectedTables}
                                    setSelectedTables={setSelectedTables}
                                    isAvailable={t.isAvailable}
                                />
                            ))}
                        </>
                    )}
                </div>
            </div>

            {/* Traslate Button */}
            <div
                className={cn(
                    "sticky mt-4 -bottom-4 flex transition-all duration-300 w-[95%] mx-auto justify-center bg-white border rounded-md p-4",
                    selectedTables.length === 0 &&
                        "opacity-0 translate-y-8 pointer-events-none"
                )}
            >
                <Button
                    variant="default"
                    className="w-full"
                    onClick={() => setIsOpenAddTableForm(true)}
                >
                    เปิด {selectedTables.length} โต๊ะ
                </Button>
            </div>

            <AddTableForm
                selectedTables={selectedTables}
                setSelectedTables={setSelectedTables}
                isOpen={isOpenAddTableForm}
                setIsOpen={setIsOpenAddTableForm}
            />
        </AdminPageWrapper>
    );
}

export default TablesPage;
