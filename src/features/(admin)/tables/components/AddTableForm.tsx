import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { FormProvider, useForm } from "react-hook-form";
import { insertTalblesSchema, insertTalblesSchemaType } from "../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import InputWithLabel from "@/components/inputs/InputWithLabel";
import { useCreateAdminTables } from "../api/use-create-admin-tables";
import { TableStateType } from "../type";

type AddTableFormProps = {
    selectedTables: TableStateType[];
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
};

function AddTableForm({
    selectedTables,
    isOpen,
    setIsOpen,
}: AddTableFormProps) {
    const { mutate: createOpenTable } = useCreateAdminTables();
    const form = useForm<insertTalblesSchemaType>({
        resolver: zodResolver(insertTalblesSchema),
        defaultValues: {
            customerName: "",
            customerPhone: "",
            adultNumber: 0,
            childNumber: 0,
        },
    });

    const handleSubmit = (data: insertTalblesSchemaType) => {
        const tableIdArray = selectedTables.map((table) => table.tableId);

        const finalValues = {
            ...data,
            tableNumber: tableIdArray,
        };

        createOpenTable({
            json: finalValues,
        });
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <FormProvider {...form}>
                <form
                    id="add-table-form"
                    onSubmit={form.handleSubmit(handleSubmit)}
                >
                    <DialogContent className=" border-coffee-dark sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle asChild>
                                <p className="text-coffee-dark text-lg font-bold">
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
                                labelClassName="text-sm font-medium text-coffee-dark"
                                inputClassName="text-sm bg-white border border-coffee-dark"
                                errorClassName="right-0"
                            />
                            <InputWithLabel
                                fieldTitle="เบอร์โทรศัพท์"
                                nameInSchema="customerPhone"
                                placeholder="เบอร์โทรศัพท์"
                                type="text"
                                labelClassName="text-sm font-medium text-coffee-dark"
                                inputClassName="text-sm bg-white border border-coffee-dark"
                                errorClassName="right-0"
                            />
                            <InputWithLabel
                                fieldTitle="จำนวนผู้ใหญ่"
                                nameInSchema="adultNumber"
                                placeholder="จำนวนผู้ใหญ่"
                                type="number"
                                labelClassName="text-sm font-medium text-coffee-dark"
                                inputClassName="text-sm bg-white border border-coffee-dark"
                                errorClassName="right-0"
                            />
                            <InputWithLabel
                                fieldTitle="จำนวนเด็ก"
                                nameInSchema="childNumber"
                                placeholder="จำนวนเด็ก"
                                type="number"
                                labelClassName="text-sm font-medium text-coffee-dark"
                                inputClassName="text-sm bg-white border border-coffee-dark"
                                errorClassName="right-0"
                            />
                            <div className="flex items-center justify-between mt-4">
                                <p className="text-sm font-medium text-coffee-dark">
                                    โต๊ะที่เลือก
                                </p>
                                <div className="flex items-center gap-2">
                                    {selectedTables.map((table) => (
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
                                <Button type="button" variant="coffeeOutline">
                                    ยกเลิก
                                </Button>
                            </DialogClose>
                            <Button
                                form="add-table-form"
                                type="submit"
                                variant="coffeePrimary"
                            >
                                เปิดโต๊ะ
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </form>
            </FormProvider>
        </Dialog>
    );
}

export default AddTableForm;

const BadgeTable = ({ tableNumber }: { tableNumber: string }) => {
    return (
        <div className="bg-coffee-dark text-coffee-light rounded-md px-4 py-1 text-sm">
            {tableNumber}
        </div>
    );
};
