"use client";
import ImageInput from "@/components/inputs/ImageInput";
import TextHeader from "@/components/TextHeader";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import {
    updateStockProductSchema,
    updateStockProductSchemaType,
} from "@/features/(admin)/stocks/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import InputWithLabel from "@/components/inputs/InputWithLabel";
import SelectWithLabel from "@/components/inputs/SelectWithLabel";
import { StockProductCategory } from "@/features/(admin)/stocks/types";
import { Button } from "@/components/ui/button";
import { useGetProductId } from "@/features/(admin)/stocks/hooks/get-productId";
import { useGetProductStock } from "@/features/(admin)/stocks/api/use-get-product-stock";
import { useEffect, useState } from "react";
import { useUpdateProductStock } from "@/features/(admin)/stocks/api/use-update-product-stock";
import PageLoader from "@/components/PageLoader";
import { Loader2 } from "lucide-react";
import AdminPageWrapper from "@/components/AdminPageWrapper";

function StockDetailPage() {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const productId = useGetProductId();
    const { data: productStockData, isLoading: isLoadingProductStock } =
        useGetProductStock(productId);
    const { mutate: updateProductStock, isPending: isUpdatingProductStock } =
        useUpdateProductStock({
            productId,
            setIsEditing,
        });
    const form = useForm<z.infer<typeof updateStockProductSchema>>({
        resolver: zodResolver(updateStockProductSchema),
        defaultValues: {
            name: "",
            image: undefined,
            unit: "",
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

    useEffect(() => {
        if (productStockData) {
            form.reset({
                name: productStockData.name,
                image: productStockData.image,
                unit: productStockData.unit,
                category: productStockData.category,
                price: productStockData.price,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [productStockData]);

    const onSubmit = (data: updateStockProductSchemaType) => {
        const finalValues = {
            ...data,
            price: String(data.price),
        };

        updateProductStock({
            param: {
                productId,
            },
            form: finalValues,
        });
    };

    const isLoading = isLoadingProductStock || isUpdatingProductStock;

    return (
        <AdminPageWrapper>
            <TextHeader text="รายละเอียดสินค้า" />

            {isLoadingProductStock ? (
                <PageLoader className="h-[400px]" />
            ) : (
                <FormProvider {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="mt-4">
                            {/* Image */}
                            <div className="w-4/5 mx-auto">
                                <ImageInput
                                    nameInSchema="image"
                                    handleImageChange={handleFileChange}
                                    value={
                                        form.watch("image") as
                                            | File
                                            | string
                                            | null
                                    }
                                    disabled={!isEditing || isLoading}
                                />
                            </div>

                            <div className="flex flex-col gap-2 mt-8">
                                <InputWithLabel
                                    fieldTitle="ชื่อสินค้า"
                                    nameInSchema="name"
                                    placeholder="กรุณากรอกชื่อสินค้า"
                                    disabled={!isEditing || isLoading}
                                />

                                <InputWithLabel
                                    fieldTitle="หน่วยสินค้า"
                                    nameInSchema="unit"
                                    placeholder="หน่วยของสินค้า"
                                    inputClassName="text-sm bg-white  w-full "
                                    labelClassName="text-sm font-medium text-coffee-dark"
                                    disabled={!isEditing || isLoading}
                                />

                                <div className="flex gap-2">
                                    <div className="w-full">
                                        <InputWithLabel
                                            fieldTitle="ราคาสินค้า"
                                            nameInSchema="price"
                                            placeholder="กรุณากรอกราคาสินค้า"
                                            disabled={!isEditing || isLoading}
                                        />
                                    </div>
                                    <SelectWithLabel
                                        fieldTitle="หมวดหมู่"
                                        nameInSchema="category"
                                        options={StockProductCategory}
                                        placeholder="หมวดหมู่"
                                        disabled={!isEditing || isLoading}
                                    />
                                </div>

                                <div className="mt-4 flex flex-col gap-2">
                                    {isEditing && (
                                        <Button
                                            key="save-button"
                                            variant="coffeePrimary"
                                            className="w-full"
                                            type="submit"
                                            disabled={isLoading}
                                        >
                                            {isLoading ? (
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                            ) : (
                                                "บันทึก"
                                            )}
                                        </Button>
                                    )}

                                    {isEditing ? (
                                        <Button
                                            key="edit-button"
                                            variant="coffeeOutline"
                                            className="w-full"
                                            type="button"
                                            onClick={() => setIsEditing(false)}
                                            disabled={isLoading}
                                        >
                                            ยกเลิก
                                        </Button>
                                    ) : (
                                        <Button
                                            key="cancel-button"
                                            variant="coffeePrimary"
                                            className="w-full"
                                            type="button"
                                            onClick={() => setIsEditing(true)}
                                        >
                                            แก้ไข
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </form>
                </FormProvider>
            )}
        </AdminPageWrapper>
    );
}

export default StockDetailPage;
