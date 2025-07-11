"use client";

import PageLoader from "@/components/PageLoader";
import PageWrapper from "@/components/PageWrapper";
import TextHeader from "@/components/TextHeader";
import { useGetPreOrders } from "@/features/(client)/pre-orders/api/use-get-preOrders";
import PreOrderCard from "@/features/(client)/pre-orders/components/PreOrderCard";
import React from "react";

function OrdersPage() {
    const {
        data: preOrdersData,
        isLoading: isLoadingPreOrders,
        error,
    } = useGetPreOrders();

    if (error) {
        return <div>Error...</div>;
    }

    return (
        <PageWrapper>
            <TextHeader text="ประวัติการจอง" className="text-2xl md:text-4xl" />

            {isLoadingPreOrders ? (
                <PageLoader className="h-[400px]" />
            ) : preOrdersData?.length ? (
                <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                    {preOrdersData?.map((preOrder) => (
                        <PreOrderCard key={preOrder.id} preOrder={preOrder} />
                    ))}
                </div>
            ) : (
                <div className="mt-20 text-center">
                    <p className="text-gray-500">ไม่มีรายการจอง</p>
                </div>
            )}
        </PageWrapper>
    );
}

export default OrdersPage;
