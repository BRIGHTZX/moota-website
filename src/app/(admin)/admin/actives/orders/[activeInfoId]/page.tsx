"use client";
import PageLoader from "@/components/PageLoader";
import TextHeader from "@/components/TextHeader";
import { useGetActiveInfoTableNumber } from "@/features/(admin)/orders/api/use-get-activeInfo-tableNumber";
import { useGetActiveInfoIdTableId } from "@/features/(admin)/orders/hooks/get-activeInfoId-tableId";
import OrderProductSection from "@/features/(admin)/orders/components/OrderProductSection";
import React, { useEffect } from "react";

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
            <TextHeader text={`รายการออเดอร์โต๊ะ ${activeInfo?.tableNumber}`} />

            {/* Order Product Section */}
            <div className="mt-4">
                <OrderProductSection activeInfoId={activeInfoId} />
            </div>
        </div>
    );
}

export default OrdersPage;
