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
import { useState } from "react";
import { MinusIcon, PlusIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
    importExportProductSchema,
    importExportProductSchemaType,
} from "../schemas";
import { useGetImportExportProduct } from "../api/use-get-import-export-product";
import PageLoader from "@/components/PageLoader";
import { useAddImportExportProduct } from "../api/use-add-import-export-product";
import { toast } from "sonner";

type ImportProductProps = {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    importProductId: string | null;
};

function ImportProduct({
    isOpen,
    setIsOpen,
    importProductId,
}: ImportProductProps) {
    const [importType, setImportType] = useState<"import" | "export">("import");
    const {
        data: productData,
        isLoading: isLoadingProduct,
        isError: isErrorProduct,
    } = useGetImportExportProduct(importProductId ?? null);

    const {
        mutate: addImportExportProduct,
        isPending: isLoadingAddImportExportProduct,
        isError: isErrorAddImportExportProduct,
    } = useAddImportExportProduct({
        setIsOpen,
    });

    const form = useForm<Omit<importExportProductSchemaType, "type">>({
        resolver: zodResolver(importExportProductSchema.omit({ type: true })),
        defaultValues: {
            stock: 0,
        },
    });

    const handleSubmit = (
        data: Omit<importExportProductSchemaType, "type">
    ) => {
        if (importType === "export" && data.stock > (productData?.stock ?? 0)) {
            toast.error("จำนวนสินค้าที่นำออกเกินจำนวนสินค้าที่มี");
            form.setError("stock", {
                message: "จำนวนสินค้าที่นำออกเกินจำนวนสินค้าที่มี",
            });
            return;
        }

        const finalValues = {
            ...data,
            type: importType,
        };

        addImportExportProduct(
            {
                param: {
                    productId: importProductId ?? "",
                },
                json: finalValues,
            },
            {
                onSuccess: () => {
                    form.reset();
                    setIsOpen(false);
                    setImportType("import");
                },
            }
        );
    };

    const isError = isErrorAddImportExportProduct || isErrorProduct;
    const isLoading = isLoadingProduct || isLoadingAddImportExportProduct;

    if (isError) {
        return <div>Error</div>;
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <FormProvider {...form}>
                <form
                    id="import-export-product-form"
                    onSubmit={form.handleSubmit(handleSubmit)}
                >
                    <DialogContent className=" border-coffee-dark sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle asChild>
                                <p className="text-coffee-dark text-lg font-bold">
                                    {importType === "import"
                                        ? "นำเข้าสินค้า"
                                        : "นำออกสินค้า"}
                                </p>
                            </DialogTitle>
                        </DialogHeader>
                        {isLoadingProduct ? (
                            <PageLoader className="h-[200px]" />
                        ) : (
                            <>
                                <div className="text-center">
                                    <p className="text-coffee-dark font-bold">
                                        <span className="text-coffee-dark">
                                            &quot;
                                        </span>{" "}
                                        {productData?.name}{" "}
                                        <span className="text-coffee-dark">
                                            &quot;
                                        </span>
                                    </p>
                                </div>
                                <div className="grid gap-2">
                                    <div className="flex gap-2">
                                        <Button
                                            key="import"
                                            type="button"
                                            onClick={() =>
                                                setImportType("import")
                                            }
                                            disabled={isLoading}
                                            className={cn(
                                                "w-1/2",
                                                importType === "import"
                                                    ? "bg-emerald-500"
                                                    : "border border-emerald-500 bg-white text-emerald-500"
                                            )}
                                        >
                                            <PlusIcon className="size-4" />
                                            นำเข้าสินค้า
                                        </Button>
                                        <Button
                                            key="export"
                                            type="button"
                                            onClick={() =>
                                                setImportType("export")
                                            }
                                            disabled={isLoading}
                                            className={cn(
                                                "w-1/2",
                                                importType === "export"
                                                    ? "bg-red-500"
                                                    : "border border-red-500 bg-white text-red-500"
                                            )}
                                        >
                                            <MinusIcon className="size-4" />
                                            นำออกสินค้า
                                        </Button>
                                    </div>

                                    <div className="mt-4">
                                        <InputWithLabel
                                            fieldTitle={`จำนวน (${
                                                productData?.unit ?? ""
                                            }) : มีอยู่ ${
                                                productData?.stock ?? 0
                                            }`}
                                            nameInSchema="stock"
                                            placeholder="กรุณากรอกจำนวนสินค้า"
                                            type="number"
                                            inputClassName="text-center border border-coffee-dark"
                                            disabled={isLoading}
                                        />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <div className="flex mt-4 items-center justify-between gap-2">
                                        <DialogClose asChild>
                                            <Button
                                                key="cancel"
                                                type="button"
                                                variant="outline"
                                                disabled={isLoading}
                                            >
                                                ยกเลิก
                                            </Button>
                                        </DialogClose>
                                        <Button
                                            form="import-export-product-form"
                                            type="submit"
                                            className={cn(
                                                "bg-coffee-dark text-white",
                                                importType === "import"
                                                    ? "bg-emerald-500"
                                                    : "bg-red-500"
                                            )}
                                            disabled={isLoading}
                                        >
                                            {importType === "import"
                                                ? "นำเข้าสินค้า"
                                                : "นำออกสินค้า"}
                                        </Button>
                                    </div>
                                </DialogFooter>
                            </>
                        )}
                    </DialogContent>
                </form>
            </FormProvider>
        </Dialog>
    );
}

export default ImportProduct;
