"use client";
import PageLoader from "@/components/PageLoader";
import TextHeader from "@/components/TextHeader";
import { Button } from "@/components/ui/button";
import { useGetProductsStock } from "@/features/(admin)/stocks/api/use-get-products-stock";
import AddStockProductForm from "@/features/(admin)/stocks/components/AddStockProductForm";
import ImportExportProduct from "@/features/(admin)/import-export/components/ImportExportProduct";
import StockProductTable from "@/features/(admin)/stocks/components/StockProductTable";
import { PlusIcon } from "lucide-react";
import { useState } from "react";

function StockPage() {
    const [isAddStockProductFormOpen, setIsAddStockProductFormOpen] =
        useState<boolean>(false);
    const [isImportProductFormOpen, setIsImportProductFormOpen] =
        useState<boolean>(false);
    const [importProductId, setImportProductId] = useState<string | null>(null);

    const { data: productsStockData, isLoading: isLoadingProductsStock } =
        useGetProductsStock();

    if (isLoadingProductsStock) {
        return <PageLoader />;
    }

    return (
        <div className="p-4 pt-20 pb-8 relative h-[calc(100vh-5rem)]  overflow-y-auto">
            {/* Button Section */}
            <div className="flex items-center justify-between gap-2 mt-4">
                <TextHeader text="รายการสต๊อค" />
                <Button
                    variant="coffeePrimary"
                    onClick={() => setIsAddStockProductFormOpen(true)}
                >
                    <PlusIcon className="w-4 h-4" />
                    เพิ่มสินค้าใหม่
                </Button>
            </div>

            <div className="mt-4">
                <StockProductTable
                    products={
                        productsStockData?.map((r) => ({
                            id: r.id,
                            products: r.products,
                            stocks: r.stocks,
                        })) || []
                    }
                    setIsImportProductFormOpen={() =>
                        setIsImportProductFormOpen(true)
                    }
                    setImportProductId={setImportProductId}
                />
            </div>
            <AddStockProductForm
                isOpen={isAddStockProductFormOpen}
                setIsOpen={setIsAddStockProductFormOpen}
            />
            <ImportExportProduct
                importProductId={importProductId}
                isOpen={isImportProductFormOpen}
                setIsOpen={setIsImportProductFormOpen}
            />
        </div>
    );
}

export default StockPage;
