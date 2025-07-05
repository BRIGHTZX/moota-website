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
import { useEffect } from "react";
import { useUpdateProductStock } from "@/features/(admin)/stocks/api/use-update-product-stock";

function StockDetailPage() {
    const productId = useGetProductId();
    const { data: productStockData } = useGetProductStock(productId);
    const { mutate: updateProductStock } = useUpdateProductStock({
        productId,
    });
    const form = useForm<z.infer<typeof updateStockProductSchema>>({
        resolver: zodResolver(updateStockProductSchema),
        defaultValues: {
            name: "",
            image: undefined,
            unit: "",
            category: "",
            stock: 0,
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
                stock: productStockData.stocks,
                price: productStockData.price,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [productStockData]);

    const onSubmit = (data: updateStockProductSchemaType) => {
        const finalValues = {
            ...data,
            price: String(data.price),
            stock: String(data.stock),
        };

        console.log(finalValues);

        updateProductStock({
            param: {
                productId,
            },
            form: finalValues,
        });
    };

    return (
        <div className="p-4 pt-20 relative h-[calc(100vh-5rem)]  overflow-y-auto">
            <TextHeader text="รายละเอียดสินค้า" />

            <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="mt-4">
                        {/* Image */}
                        <div className="w-4/5 mx-auto">
                            <ImageInput
                                nameInSchema="image"
                                handleImageChange={handleFileChange}
                                value={
                                    form.watch("image") as File | string | null
                                }
                            />
                        </div>

                        <div className="flex flex-col gap-2 mt-8">
                            <InputWithLabel
                                fieldTitle="ชื่อสินค้า"
                                nameInSchema="name"
                                placeholder="กรุณากรอกชื่อสินค้า"
                            />

                            <div className="flex gap-2">
                                <div className="w-full">
                                    <InputWithLabel
                                        fieldTitle="หน่วยสินค้า"
                                        nameInSchema="unit"
                                        placeholder="หน่วยของสินค้า"
                                        inputClassName="text-sm bg-white  w-full "
                                        labelClassName="text-sm font-medium text-coffee-dark"
                                    />
                                </div>

                                <SelectWithLabel
                                    fieldTitle="หมวดหมู่"
                                    nameInSchema="category"
                                    options={StockProductCategory}
                                    placeholder="หมวดหมู่"
                                />
                            </div>

                            <div className="flex gap-2">
                                <InputWithLabel
                                    fieldTitle="จำนวนสินค้า"
                                    nameInSchema="stock"
                                    placeholder="กรุณากรอกจำนวนสินค้า"
                                />

                                <InputWithLabel
                                    fieldTitle="ราคาสินค้า"
                                    nameInSchema="price"
                                    placeholder="กรุณากรอกราคาสินค้า"
                                />
                            </div>

                            <div className="mt-4">
                                <Button
                                    variant="coffeePrimary"
                                    className="w-full"
                                >
                                    บันทึก
                                </Button>
                            </div>
                        </div>
                    </div>
                </form>
            </FormProvider>
        </div>
    );
}

export default StockDetailPage;
