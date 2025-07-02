"use client";
import PageLoader from "@/components/PageLoader";
import TextHeader from "@/components/TextHeader";
import { useGetOrders } from "@/features/(admin)/orders/api/use-get-orders";
import OrderCard from "@/features/(admin)/orders/components/OrderCard";

function OrderPage() {
    const {
        data: orders,
        isLoading: isLoadingOrders,
        error: errorOrders,
    } = useGetOrders();

    if (errorOrders) {
        return <div>Error: {errorOrders.message}</div>;
    }

    return (
        <div className="p-4 mt-14 mb-20">
            <div className="flex items-center gap-2">
                <TextHeader text="ออเดอร์จองทั้งหมด" />
            </div>

            {isLoadingOrders ? (
                <PageLoader className="h-[400px]" />
            ) : (
                <div className="flex flex-col gap-4">
                    {orders?.map((order) => (
                        <OrderCard key={order.id} order={order} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default OrderPage;
