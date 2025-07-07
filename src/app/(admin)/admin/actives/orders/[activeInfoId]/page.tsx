"use client";
import PageLoader from "@/components/PageLoader";
import TextHeader from "@/components/TextHeader";
import { useGetActiveInfoTableNumber } from "@/features/(admin)/orders/api/use-get-activeInfo-tableNumber";
import { useGetActiveInfoIdTableId } from "@/features/(admin)/orders/hooks/get-activeInfoId-tableId";
import OrderProductSection from "@/features/(admin)/orders/components/OrderProductSection";
import React, { useEffect } from "react";
import { ArrowLeftIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function OrdersPage() {
    const activeInfoId = useGetActiveInfoIdTableId();

    const {
        data: activeInfo,
        isLoading: isLoadingActiveInfo,
        isError: isErrorActiveInfo,
    } = useGetActiveInfoTableNumber(activeInfoId);

    useEffect(() => {}, [activeInfo]);

    if (isLoadingActiveInfo) return <PageLoader />;
    if (isErrorActiveInfo) return <div>Error</div>;

    return (
        <div className="p-4 pt-20 pb-8 relative h-[calc(100vh-5rem)]  overflow-y-auto">
            <div className="flex items-center gap-4">
                <Button asChild variant="outline" className="size-8">
                    <Link href="/admin/actives">
                        <ArrowLeftIcon className="w-6 h-6" />
                    </Link>
                </Button>

                <TextHeader
                    text={`ออเดอร์โต๊ะ ${activeInfo?.diningTable?.tableNumber}`}
                />
            </div>

            {/* Order Product Section */}
            <div className="mt-4">
                <OrderProductSection activeInfoId={activeInfoId} />
            </div>
        </div>
    );
}

export default OrdersPage;
