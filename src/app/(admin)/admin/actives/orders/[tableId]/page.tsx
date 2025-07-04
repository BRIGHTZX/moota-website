import TextHeader from "@/components/TextHeader";
import OrderProductSection from "@/features/(admin)/orders/components/OrderProductSection";
import React from "react";

function OrdersPage() {
    const tableId = 1;
    return (
        <div className="p-4 pt-20 pb-8 relative h-[calc(100vh-5rem)]  overflow-y-auto">
            <TextHeader text={`รายการออเดอร์โต๊ะ ${tableId}`} />

            <div className="mt-4">
                <OrderProductSection />
            </div>
        </div>
    );
}

export default OrdersPage;
