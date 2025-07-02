"use client";

import { useGetPreOrders } from "@/features/(client)/pre-orders/api/use-get-preOrders";
import PreOrderCard from "@/features/(client)/pre-orders/components/PreOrderCard";
import React from "react";

function OrdersPage() {
    const { data: preOrdersData, isLoading, error } = useGetPreOrders();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error...</div>;
    }

    return (
        <div className="pt-30 container mx-auto px-4">
            <h1 className="text-4xl font-bold">รายการจอง</h1>

            <div className="mt-10 flex flex-col gap-4">
                {preOrdersData?.map((preOrder) => (
                    <PreOrderCard key={preOrder.id} preOrder={preOrder} />
                ))}
            </div>
        </div>
    );
}

export default OrdersPage;
