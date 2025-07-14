"use client";
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
import { zodResolver } from "@hookform/resolvers/zod";
import InputWithLabel from "@/components/inputs/InputWithLabel";
import {
    insertStockProductSchema,
    insertStockProductSchemaType,
} from "../schemas";
import ImageInput from "@/components/inputs/ImageInput";
import SelectWithLabel from "@/components/inputs/SelectWithLabel";
import { StockProductCategory } from "../types";
import { useAddProductStock } from "../api/use-add-product-stock";
import { toast } from "sonner";

type AddStockProductFormProps = {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
};

function AddStockProductForm({ isOpen, setIsOpen }: AddStockProductFormProps) {
    const {
        mutate: addProductStock,
        isPending: isAddingProductStock,
        isError: isErrorAddingProductStock,
    } = useAddProductStock({ setIsOpen });
    const form = useForm<insertStockProductSchemaType>({
        resolver: zodResolver(insertStockProductSchema),
        defaultValues: {
            name: "",
            unit: "",
            image: undefined,
            category: "",
            price: 0,
            limitAlert: 0,
        },
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            form.setValue("image", file, { shouldValidate: true });
        }
    };

    const onSubmit = (data: insertStockProductSchemaType) => {
        const finalValues = {
            ...data,
            price: String(data.price),
            limitAlert: String(data.limitAlert),
        };
        addProductStock({ form: finalValues });
    };

    if (isErrorAddingProductStock) {
        toast.error("เพิ่มสินค้าไม่สำเร็จ");
        return <div>error</div>;
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <FormProvider {...form}>
                <form
                    id="add-stock-product-form"
                    onSubmit={form.handleSubmit(onSubmit)}
                >
                    <DialogContent className=" border-gray-300 shadow-sm sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle asChild>
                                <p className="text-black text-lg font-bold">
                                    เพิ่มสินค้าใหม่
                                </p>
                            </DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-2">
                            <ImageInput<insertStockProductSchemaType>
                                value={form.watch("image") as File | null}
                                nameInSchema="image"
                                errorClassName="right-0"
                                handleImageChange={handleFileChange}
                                disabled={isAddingProductStock}
                            />
                            <InputWithLabel<insertStockProductSchemaType>
                                fieldTitle="ชื่อสินค้า"
                                nameInSchema="name"
                                placeholder="ชื่อสินค้า"
                                type="text"
                                labelClassName="text-sm font-medium text-black"
                                inputClassName="text-sm bg-white border border-gray-300 shadow-sm"
                                errorClassName="right-0"
                                disabled={isAddingProductStock}
                            />
                            <InputWithLabel<insertStockProductSchemaType>
                                fieldTitle="หน่วย"
                                nameInSchema="unit"
                                placeholder="หน่วย"
                                type="text"
                                labelClassName="text-sm font-medium text-black"
                                inputClassName="text-sm bg-white border  border-gray-300 shadow-sm"
                                errorClassName="right-0"
                                disabled={isAddingProductStock}
                            />
                            <div className="flex items-center gap-2">
                                <div className="w-full">
                                    <InputWithLabel<insertStockProductSchemaType>
                                        fieldTitle="ราคา"
                                        nameInSchema="price"
                                        placeholder="ราคา"
                                        type="number"
                                        labelClassName="text-sm font-medium text-black"
                                        inputClassName="text-sm bg-white border border-gray-300 shadow-sm"
                                        errorClassName="right-0"
                                        disabled={isAddingProductStock}
                                    />
                                </div>
                                <SelectWithLabel<insertStockProductSchemaType>
                                    fieldTitle="หมวดหมู่"
                                    nameInSchema="category"
                                    placeholder="หมวดหมู่"
                                    labelClassName="text-sm font-medium text-black"
                                    inputClassName="text-sm bg-white border w-full border-gray-300 shadow-sm"
                                    errorClassName="right-0"
                                    options={StockProductCategory}
                                    disabled={isAddingProductStock}
                                />
                            </div>
                            <InputWithLabel<insertStockProductSchemaType>
                                fieldTitle="จำนวนสินค้าที่ต้องการแจ้งเตือน"
                                nameInSchema="limitAlert"
                                placeholder="จำนวนสินค้าที่ต้องการแจ้งเตือน"
                                type="number"
                                labelClassName="text-sm font-medium text-black"
                                inputClassName="text-sm bg-white border  border-gray-300 shadow-sm"
                                errorClassName="right-0"
                                disabled={isAddingProductStock}
                            />
                        </div>
                        <DialogFooter>
                            <div className="flex mt-4 items-center justify-between gap-2">
                                <DialogClose asChild>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        disabled={isAddingProductStock}
                                    >
                                        ยกเลิก
                                    </Button>
                                </DialogClose>
                                <Button
                                    form="add-stock-product-form"
                                    type="submit"
                                    variant="default"
                                    disabled={isAddingProductStock}
                                >
                                    เพิ่มสินค้าใหม่
                                </Button>
                            </div>
                        </DialogFooter>
                    </DialogContent>
                </form>
            </FormProvider>
        </Dialog>
    );
}

export default AddStockProductForm;
