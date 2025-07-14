"use client";
import PageLoader from "@/components/PageLoader";
import TextHeader from "@/components/TextHeader";
import { Button } from "@/components/ui/button";
import { useGetProductsStock } from "@/features/(admin)/stocks/api/use-get-products-stock";
import AddStockProductForm from "@/features/(admin)/stocks/components/AddStockProductForm";
import ImportExportProduct from "@/features/(admin)/import-export/components/ImportExportProduct";
import StockProductTable from "@/features/(admin)/stocks/components/StockProductTable";
import { HistoryIcon, PlusIcon } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import AdminPageWrapper from "@/components/AdminPageWrapper";
import LimitNotification from "@/features/(admin)/stocks/components/LimitNotification";

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
        <AdminPageWrapper>
            <div className="flex justify-between items-center">
                <TextHeader text="รายการสต๊อค" />
                <LimitNotification />
            </div>
            {/* Button Section */}
            <div className="flex items-center gap-1 mt-4">
                <Button
                    onClick={() => setIsAddStockProductFormOpen(true)}
                    className="flex-[1_1_0] flex items-center justify-center gap-1"
                    size="sm"
                >
                    <PlusIcon className="w-4 h-4 shrink-0" />
                    <span className="text-xs whitespace-nowrap">
                        เพิ่มสินค้าใหม่
                    </span>
                </Button>
                <Button
                    asChild
                    variant="outline"
                    className="flex-[1_1_0] flex items-center justify-center gap-1"
                    size="sm"
                >
                    <Link
                        href="/admin/stocks/history"
                        className="text-xs flex items-center gap-1"
                    >
                        <HistoryIcon className="w-4 h-4 shrink-0" />
                        <span className="whitespace-nowrap">
                            ประวัติการนำเข้า/ออก
                        </span>
                    </Link>
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
        </AdminPageWrapper>
    );
}

export default StockPage;
