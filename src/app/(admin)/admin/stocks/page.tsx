"use client";
import TextHeader from "@/components/TextHeader";
import { Button } from "@/components/ui/button";
import AddStockProductForm from "@/features/(admin)/stocks/components/AddStockProductForm";
import StockProductSection from "@/features/(admin)/stocks/components/StockProductSection";
import { PlusIcon } from "lucide-react";
import { useState } from "react";

function StockPage() {
    const [isAddStockProductFormOpen, setIsAddStockProductFormOpen] =
        useState<boolean>(false);
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
                <div className="flex items-center gap-2">
                    <div className="border border-coffee-dark bg-coffee-light rounded-lg p-2 w-full">
                        <p>Search....</p>
                    </div>
                </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-4">
                <StockProductSection />
            </div>

            <AddStockProductForm
                isOpen={isAddStockProductFormOpen}
                setIsOpen={setIsAddStockProductFormOpen}
            />
        </div>
    );
}

export default StockPage;
