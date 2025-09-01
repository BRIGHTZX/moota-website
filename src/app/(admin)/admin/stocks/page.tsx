'use client';
import PageLoader from '@/components/PageLoader';
import TextHeader from '@/components/TextHeader';
import { Button } from '@/components/ui/button';
import { useGetProductsStock } from '@/features/(admin)/stocks/api/use-get-products-stock';
import AddStockProductForm from '@/features/(admin)/stocks/components/AddStockProductForm';
import ImportExportProduct from '@/features/(admin)/import-export/components/ImportExportProduct';
import StockProductTable from '@/features/(admin)/stocks/components/StockProductTable';
import { HistoryIcon, PlusIcon } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import AdminPageWrapper from '@/components/AdminPageWrapper';
import LimitNotification from '@/features/(admin)/stocks/components/LimitNotification';
import ErrorPage from '@/components/errors/ErrorPage';

function StockPage() {
    const [isAddStockProductFormOpen, setIsAddStockProductFormOpen] =
        useState<boolean>(false);
    const [isImportProductFormOpen, setIsImportProductFormOpen] =
        useState<boolean>(false);
    const [importProductId, setImportProductId] = useState<string | null>(null);

    const {
        data: productsStockData,
        isLoading: isLoadingProductsStock,
        isError,
    } = useGetProductsStock();

    const isLoading = isLoadingProductsStock;
    if (isError) return <ErrorPage />;

    return (
        <AdminPageWrapper>
            <div className="flex items-center justify-between">
                <TextHeader text="รายการสต็อก" />
                <LimitNotification />
            </div>

            {isLoading ? (
                <PageLoader className="h-[calc(100dvh-30dvh)]" />
            ) : (
                <>
                    <div className="mt-4 flex items-center gap-1">
                        <Button
                            onClick={() => setIsAddStockProductFormOpen(true)}
                            className="flex flex-[1_1_0] items-center justify-center gap-1"
                            size="sm"
                        >
                            <PlusIcon className="h-4 w-4 shrink-0" />
                            <span className="text-xs whitespace-nowrap">
                                เพิ่มสินค้าใหม่
                            </span>
                        </Button>
                        <Button
                            asChild
                            variant="outline"
                            className="flex flex-[1_1_0] items-center justify-center gap-1"
                            size="sm"
                        >
                            <Link
                                href="/admin/stocks/history"
                                className="flex items-center gap-1 text-xs"
                            >
                                <HistoryIcon className="h-4 w-4 shrink-0" />
                                <span className="whitespace-nowrap">
                                    ประวัติการนำเข้า/ออก
                                </span>
                            </Link>
                        </Button>
                    </div>
                    <div className="mt-4">
                        <StockProductTable
                            products={
                                productsStockData?.map(r => ({
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
                </>
            )}
            {/* Button Section */}
        </AdminPageWrapper>
    );
}

export default StockPage;
