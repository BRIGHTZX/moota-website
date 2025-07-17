import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { FormProvider, useForm } from 'react-hook-form';
import { insertTalblesSchema, insertTalblesSchemaType } from '../schema';
import { zodResolver } from '@hookform/resolvers/zod';
import InputWithLabel from '@/components/inputs/InputWithLabel';
import { useCreateAdminTables } from '../api/use-create-admin-tables';
import { TableStateType } from '../type';
import SuspenseLoading from '@/components/SuspenseLoading';
import { useState } from 'react';

type AddTableFormProps = {
    selectedTables: TableStateType[];
    setSelectedTables: (selectedTables: TableStateType[]) => void;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
};

function AddTableForm({
    selectedTables,
    setSelectedTables,
    isOpen,
    setIsOpen,
}: AddTableFormProps) {
    const [isSuspenseLoading, setIsSuspenseLoading] = useState(false);
    const { mutate: createOpenTable, isPending: isLoadingCreateOpenTable } =
        useCreateAdminTables();

    const form = useForm<insertTalblesSchemaType>({
        resolver: zodResolver(insertTalblesSchema),
        defaultValues: {
            customerName: '',
            customerPhone: '',
            adultNumber: 0,
            childNumber: 0,
        },
    });

    const handleSubmit = (data: insertTalblesSchemaType) => {
        setIsSuspenseLoading(true);
        const tableIdArray = selectedTables.map(table => table.tableId);

        const finalValues = {
            ...data,
            childNumber: data.childNumber ?? 0,
            tableNumber: tableIdArray,
        };

        createOpenTable(
            {
                json: finalValues,
            },
            {
                onSuccess: () => {
                    setIsOpen(false);
                    form.reset();
                    setSelectedTables([]);
                    setIsSuspenseLoading(false);
                },
            }
        );
    };

    const isLoading = isLoadingCreateOpenTable;

    return (
        <>
            {isSuspenseLoading && <SuspenseLoading />}
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <FormProvider {...form}>
                    <form
                        id="add-table-form"
                        onSubmit={form.handleSubmit(handleSubmit)}
                    >
                        <DialogContent className="border border-black sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle asChild>
                                    <p className="text-lg font-bold text-black">
                                        เปิดโต๊ะ
                                    </p>
                                </DialogTitle>
                            </DialogHeader>
                            <div className="grid gap-4">
                                <InputWithLabel
                                    fieldTitle="ชื่อลูกค้า"
                                    nameInSchema="customerName"
                                    placeholder="ชื่อลูกค้า"
                                    type="text"
                                    labelClassName="text-sm font-medium text-black"
                                    inputClassName="text-sm bg-white border border-black"
                                    errorClassName="right-0"
                                    disabled={isLoading}
                                />
                                <InputWithLabel
                                    fieldTitle="เบอร์โทรศัพท์"
                                    nameInSchema="customerPhone"
                                    placeholder="เบอร์โทรศัพท์"
                                    type="text"
                                    labelClassName="text-sm font-medium text-black"
                                    inputClassName="text-sm bg-white border border-black"
                                    errorClassName="right-0"
                                    disabled={isLoading}
                                />
                                <InputWithLabel
                                    fieldTitle="จำนวนผู้ใหญ่"
                                    nameInSchema="adultNumber"
                                    placeholder="จำนวนผู้ใหญ่"
                                    type="number"
                                    labelClassName="text-sm font-medium text-black"
                                    inputClassName="text-sm bg-white border border-black"
                                    errorClassName="right-0"
                                    disabled={isLoading}
                                />
                                <InputWithLabel
                                    fieldTitle="จำนวนเด็ก"
                                    nameInSchema="childNumber"
                                    placeholder="จำนวนเด็ก"
                                    type="number"
                                    labelClassName="text-sm font-medium text-black"
                                    inputClassName="text-sm bg-white border border-black"
                                    errorClassName="right-0"
                                    disabled={isLoading}
                                />
                                <div className="mt-4 flex justify-between">
                                    <p className="w-[100px] text-sm font-medium text-nowrap text-black">
                                        โต๊ะที่เลือก
                                    </p>
                                    <div className="flex w-[185px] flex-wrap items-center justify-end gap-2">
                                        {selectedTables.map(table => (
                                            <BadgeTable
                                                key={table.tableId}
                                                tableNumber={table.tableNumber.toString()}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button
                                        disabled={isLoading}
                                        type="button"
                                        variant="outline"
                                        className="w-full"
                                    >
                                        ยกเลิก
                                    </Button>
                                </DialogClose>
                                <Button
                                    form="add-table-form"
                                    type="submit"
                                    disabled={
                                        isLoading || selectedTables.length === 0
                                    }
                                    className="w-full"
                                >
                                    เปิดโต๊ะ
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </form>
                </FormProvider>
            </Dialog>
        </>
    );
}

export default AddTableForm;

const BadgeTable = ({ tableNumber }: { tableNumber: string }) => {
    return (
        <div className="flex h-[1.5rem] w-[2.5rem] items-center justify-center rounded-md bg-blue-500 text-sm text-white">
            <p className="text-sm font-semibold">{tableNumber}</p>
        </div>
    );
};
