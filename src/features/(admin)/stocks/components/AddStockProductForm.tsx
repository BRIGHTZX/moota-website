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
                    <DialogContent className=" border-coffee-dark sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle asChild>
                                <p className="text-coffee-dark text-lg font-bold">
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
                            />
                            <InputWithLabel<insertStockProductSchemaType>
                                fieldTitle="ชื่อสินค้า"
                                nameInSchema="name"
                                placeholder="ชื่อสินค้า"
                                type="text"
                                labelClassName="text-sm font-medium text-coffee-dark"
                                inputClassName="text-sm bg-white border border-coffee-dark"
                                errorClassName="right-0"
                            />
                            <InputWithLabel<insertStockProductSchemaType>
                                fieldTitle="หน่วย"
                                nameInSchema="unit"
                                placeholder="หน่วย"
                                type="text"
                                labelClassName="text-sm font-medium text-coffee-dark"
                                inputClassName="text-sm bg-white border  border-coffee-dark"
                                errorClassName="right-0"
                            />
                            <div className="flex items-center gap-2">
                                <div className="w-full">
                                    <InputWithLabel<insertStockProductSchemaType>
                                        fieldTitle="ราคา"
                                        nameInSchema="price"
                                        placeholder="ราคา"
                                        type="number"
                                        labelClassName="text-sm font-medium text-coffee-dark"
                                        inputClassName="text-sm bg-white border border-coffee-dark"
                                        errorClassName="right-0"
                                    />
                                </div>
                                <SelectWithLabel<insertStockProductSchemaType>
                                    fieldTitle="หมวดหมู่"
                                    nameInSchema="category"
                                    placeholder="หมวดหมู่"
                                    labelClassName="text-sm font-medium text-coffee-dark"
                                    inputClassName="text-sm bg-white border w-full border-coffee-dark"
                                    errorClassName="right-0"
                                    options={StockProductCategory}
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <div className="flex mt-4 items-center justify-between gap-2">
                                <DialogClose asChild>
                                    <Button
                                        type="button"
                                        variant="coffeeOutline"
                                        disabled={isAddingProductStock}
                                    >
                                        ยกเลิก
                                    </Button>
                                </DialogClose>
                                <Button
                                    form="add-stock-product-form"
                                    type="submit"
                                    variant="coffeePrimary"
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
