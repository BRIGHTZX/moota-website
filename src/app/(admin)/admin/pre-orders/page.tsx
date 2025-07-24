'use client';
import AdminPageWrapper from '@/components/AdminPageWrapper';
import AlertDialogCustom from '@/components/AlertDialogCustom';
import ErrorPage from '@/components/errors/ErrorPage';
import PageLoader from '@/components/PageLoader';
import SuspenseLoading from '@/components/SuspenseLoading';
import TextHeader from '@/components/TextHeader';
import { useCancelPreOrder } from '@/features/(admin)/pre-orders/api/use-cancel-pre-order';
import { useCreateActiveFromOrder } from '@/features/(admin)/pre-orders/api/use-create-active-from-order';
import { useGetOrders } from '@/features/(admin)/pre-orders/api/use-get-admin-preOrders';
import OrderCard from '@/features/(admin)/pre-orders/components/OrderCard';
import PaymentImageDialog from '@/features/(admin)/pre-orders/components/PaymentImageDialog';
import { useState } from 'react';

function OrderPage() {
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const [isCancelDialogOpen, setIsCancelDialogOpen] =
        useState<boolean>(false);
    const [isSuspenseLoading, setIsSuspenseLoading] = useState<boolean>(false);
    const [isPaymentDialogOpen, setIsPaymentDialogOpen] =
        useState<boolean>(false);
    const [orderId, setOrderId] = useState<string | null>(null);
    const {
        data: orders,
        isLoading: isLoadingOrders,
        isError: isErrorOrders,
    } = useGetOrders();

    const {
        mutate: createActive,
        isPending: isLoadingCreateActive,
        isError: isErrorCreateActive,
    } = useCreateActiveFromOrder({
        setIsSuspenseLoading,
    });

    const {
        mutate: cancelOrder,
        isPending: isLoadingCancelOrder,
        isError: isErrorCancelOrder,
    } = useCancelPreOrder({
        setIsSuspenseLoading,
    });

    const handleCreateActive = async () => {
        setIsSuspenseLoading(true);
        await createActive({ json: { preOrderId: orderId ?? '' } });
    };

    const handleCancelOrder = async () => {
        setIsSuspenseLoading(true);
        await cancelOrder({ json: { preOrderId: orderId ?? '' } });
    };

    const isError = isErrorOrders || isErrorCreateActive || isErrorCancelOrder;
    const isLoading =
        isLoadingOrders || isLoadingCreateActive || isLoadingCancelOrder;

    if (isError) {
        return <ErrorPage />;
    }

    return (
        <div className="relative size-full">
            {isSuspenseLoading && <SuspenseLoading />}
            <AdminPageWrapper>
                <div className="flex items-center gap-2">
                    <TextHeader text="ออเดอร์จองทั้งหมด" />
                </div>

                {isLoadingOrders ? (
                    <PageLoader className="h-[calc(100dvh-30dvh)]" />
                ) : (
                    <div className="flex flex-col gap-4">
                        {orders?.length === 0 ? (
                            <div className="flex h-[400px] items-center justify-center">
                                <TextHeader
                                    text="ไม่มีออเดอร์จอง"
                                    className="text-lg text-gray-400"
                                />
                            </div>
                        ) : (
                            orders?.map(order => (
                                <OrderCard
                                    key={order.id}
                                    order={order}
                                    setOrderId={setOrderId}
                                    setIsDialogOpen={setIsDialogOpen}
                                    setIsCancelDialogOpen={
                                        setIsCancelDialogOpen
                                    }
                                    setIsPaymentDialogOpen={
                                        setIsPaymentDialogOpen
                                    }
                                />
                            ))
                        )}
                    </div>
                )}

                <PaymentImageDialog
                    isOpen={isPaymentDialogOpen}
                    setIsOpen={setIsPaymentDialogOpen}
                    preOrderId={orderId ?? ''}
                    setPreOrderId={setOrderId}
                />

                <AlertDialogCustom
                    title="ยืนยันการจอง"
                    description="ยืนยันการจองที่นั่ง"
                    isLoading={isLoading}
                    open={isDialogOpen}
                    setOpen={setIsDialogOpen}
                    cancelAction={() => {
                        setIsDialogOpen(false);
                        setOrderId(null);
                    }}
                    action={handleCreateActive}
                    buttonActionText="ยืนยันการจอง"
                />
                <AlertDialogCustom
                    title="ยินยันการยกเลิก"
                    description="คุณต้องการยกเลิกออเดอร์นี้หรือไม่"
                    isLoading={isLoading}
                    open={isCancelDialogOpen}
                    setOpen={setIsCancelDialogOpen}
                    cancelAction={() => {
                        setIsCancelDialogOpen(false);
                        setOrderId(null);
                    }}
                    action={handleCancelOrder}
                    buttonActionText="ยืนยันการยกเลิก"
                />
            </AdminPageWrapper>
        </div>
    );
}

export default OrderPage;
