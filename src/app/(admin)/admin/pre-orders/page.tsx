"use client";
import AdminPageWrapper from "@/components/AdminPageWrapper";
import PageLoader from "@/components/PageLoader";
import TextHeader from "@/components/TextHeader";
import { useGetOrders } from "@/features/(admin)/pre-orders/api/use-get-admin-preOrders";
import OrderCard from "@/features/(admin)/pre-orders/components/OrderCard";

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
        <AdminPageWrapper>
            <div className="flex items-center gap-2">
                <TextHeader text="ออเดอร์จองทั้งหมด" />
            </div>

            {isLoadingOrders ? (
                <PageLoader className="h-[400px]" />
            ) : (
                <div className="flex flex-col gap-4">
                    {orders?.length === 0 ? (
                        <div className="flex items-center justify-center h-[400px]">
                            <TextHeader
                                text="ไม่มีออเดอร์จอง"
                                className="text-lg text-gray-400"
                            />
                        </div>
                    ) : (
                        orders?.map((order) => (
                            <OrderCard key={order.id} order={order} />
                        ))
                    )}
                </div>
            )}
        </AdminPageWrapper>
    );
}

export default OrderPage;
