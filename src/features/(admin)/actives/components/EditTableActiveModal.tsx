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
import { zodResolver } from '@hookform/resolvers/zod';
import InputWithLabel from '@/components/inputs/InputWithLabel';
import { useEffect } from 'react';
import { updateActiveSchema, updateActiveSchemaType } from '../schemas';
import { useUpdateActive } from '../api/use-update-active';
import { useGetActive } from '../api/use-get-active';
import { ActiveDataType } from '../types';
import { Skeleton } from '@/components/ui/skeleton';
import { Loader2Icon } from 'lucide-react';

type AddTableFormProps = {
    activeId: string | null;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
};

function EditTableActiveModal({
    activeId,
    isOpen,
    setIsOpen,
}: AddTableFormProps) {
    const { data: activeData, isPending: isLoadingActive } = useGetActive(
        activeId ?? ''
    );

    const { mutate: updateActiveTable, isPending: isUpdatingActiveTable } =
        useUpdateActive({
            setIsOpen,
        });

    const defaultValues = {
        customerName: '',
        customerPhone: '',
        adultNumber: 0,
        childNumber: 0,
    };

    const form = useForm<updateActiveSchemaType>({
        resolver: zodResolver(updateActiveSchema),
        defaultValues,
    });

    useEffect(() => {
        if (activeData) {
            const data = activeData as ActiveDataType;
            form.reset({
                customerName: data.customerName,
                customerPhone: data.customerPhone,
                adultNumber: Number(data.adultNumber),
                childNumber: Number(data.childNumber),
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeData]);

    const handleSubmit = (data: updateActiveSchemaType) => {
        updateActiveTable({
            form: {
                ...data,
                adultNumber: data.adultNumber.toString(),
                childNumber: data.childNumber?.toString(),
            },
            param: {
                activeId: activeId ?? '',
            },
        });
    };

    const isLoading = isUpdatingActiveTable || isLoadingActive;

    return (
        <>
            <Dialog
                open={isOpen}
                onOpenChange={open => {
                    if (!open) {
                        setIsOpen(false);
                        form.reset();
                    }
                }}
            >
                <FormProvider {...form}>
                    <form
                        id="add-table-form"
                        onSubmit={form.handleSubmit(handleSubmit)}
                        className="relative"
                    >
                        <DialogContent className="border border-black sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>
                                    <p className="text-lg font-bold text-black">
                                        แก้ไขข้อมูลโต๊ะ
                                    </p>
                                </DialogTitle>
                            </DialogHeader>
                            {isLoadingActive ? (
                                <div className="flex flex-col gap-4">
                                    <Skeleton className="h-[400px]">
                                        <div className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-4">
                                            <Loader2Icon className="animate-spin" />
                                            <p className="text-sm font-medium text-black">
                                                กำลังโหลดข้อมูลโต๊ะ...
                                            </p>
                                        </div>
                                    </Skeleton>
                                </div>
                            ) : (
                                <>
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
                                    </div>
                                    <DialogFooter>
                                        <div className="flex w-full flex-col gap-2">
                                            <Button
                                                form="add-table-form"
                                                type="submit"
                                                disabled={isLoading}
                                                className="w-full"
                                            >
                                                แก้ไข
                                            </Button>
                                            <DialogClose asChild>
                                                <Button
                                                    disabled={isLoading}
                                                    type="button"
                                                    variant="outline"
                                                    className="w-full"
                                                    onClick={() => {
                                                        setIsOpen(false);
                                                    }}
                                                >
                                                    ยกเลิก
                                                </Button>
                                            </DialogClose>
                                        </div>
                                    </DialogFooter>
                                </>
                            )}
                        </DialogContent>
                    </form>
                </FormProvider>
            </Dialog>
        </>
    );
}

export default EditTableActiveModal;
