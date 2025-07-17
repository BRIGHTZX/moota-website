'use client';
import TextHeader from '@/components/TextHeader';
import TableCard from '@/features/(admin)/tables/components/TableCard';
import { useGetAdminTables } from '@/features/(admin)/tables/api/use-get-admin-tables';
import PageLoader from '@/components/PageLoader';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import AddTableForm from '@/features/(admin)/tables/components/AddTableForm';
import { TableStateType } from '@/features/(admin)/tables/type';
import AdminPageWrapper from '@/components/AdminPageWrapper';
import ErrorPage from '@/components/errors/ErrorPage';

function TablesPage() {
    const [selectedTables, setSelectedTables] = useState<TableStateType[]>([]);
    const [isOpenAddTableForm, setIsOpenAddTableForm] =
        useState<boolean>(false);

    const { data: tables, isLoading, isError } = useGetAdminTables();

    const tablesInside = tables?.tables.filter(t => t.tableType === 'inside');
    const tablesOutside = tables?.tables.filter(t => t.tableType === 'outside');

    if (isError) return <ErrorPage />;

    return (
        <AdminPageWrapper className="relative">
            <div className="flex items-center gap-2">
                <TextHeader text="ระบบโต๊ะ" />
            </div>

            {isLoading ? (
                <PageLoader className="h-[calc(100dvh-30dvh)]" />
            ) : (
                <>
                    {/* color status */}
                    <div className="mt-4 flex items-center justify-center gap-2">
                        <ColorStatus color="bg-green-500" text="โต๊ะว่าง" />
                        <ColorStatus color="bg-red-500" text="โต๊ะไม่ว่าง" />
                    </div>

                    <div className="mt-4">
                        <p className="text-center text-lg font-bold text-black">
                            โซนใน
                        </p>
                        <div className="mt-4 grid grid-cols-3 justify-items-center gap-4">
                            {tablesInside?.length === 0 ? (
                                <div className="col-span-3">
                                    <p className="text-md text-center text-gray-500">
                                        ไม่มีโต๊ะที่พร้อมใช้งานในโซนนี้
                                    </p>
                                </div>
                            ) : (
                                tablesInside?.map(t => (
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
                        <p className="text-center text-lg font-bold text-black">
                            โซนนอก
                        </p>
                        <div className="mt-4 grid grid-cols-3 justify-items-center gap-4">
                            {tablesOutside?.length === 0 ? (
                                <div className="col-span-3">
                                    <p className="text-md text-center text-gray-500">
                                        ไม่มีโต๊ะที่พร้อมใช้งานในโซนนี้
                                    </p>
                                </div>
                            ) : (
                                <>
                                    {tablesOutside?.map(t => (
                                        <TableCard
                                            key={t.id}
                                            tableId={t.id}
                                            tableNumber={t.tableNumber}
                                            selectedTables={selectedTables}
                                            setSelectedTables={
                                                setSelectedTables
                                            }
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
                            'fixed right-0 bottom-22 left-0 mx-auto mt-4 flex w-[95%] justify-center rounded-md border bg-white p-4 transition-all duration-300',
                            selectedTables.length === 0 &&
                                'pointer-events-none translate-y-8 opacity-0'
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
                </>
            )}
        </AdminPageWrapper>
    );
}

export default TablesPage;

function ColorStatus({ color, text }: { color: string; text: string }) {
    return (
        <div className="flex items-center justify-center gap-2">
            <span className={`size-3 rounded-full ${color}`} />
            <p className="text-center text-xs text-black">{text}</p>
        </div>
    );
}
