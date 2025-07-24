import { Button } from '@/components/ui/button';
import React from 'react';
import { OrderType } from '../types';
import { TextCardInfo } from '@/components/TextCardInfo';
import { XIcon } from 'lucide-react';

type OrderCardProps = {
    order: OrderType;
    setOrderId: (orderId: string) => void;
    setIsDialogOpen: (isDialogOpen: boolean) => void;
    setIsCancelDialogOpen: (isCancelDialogOpen: boolean) => void;
    setIsPaymentDialogOpen: (isPaymentDialogOpen: boolean) => void;
};

function OrderCard({
    order,
    setOrderId,
    setIsDialogOpen,
    setIsCancelDialogOpen,
    setIsPaymentDialogOpen,
}: OrderCardProps) {
    return (
        <div className="relative mt-4 rounded-md border border-gray-300 bg-white p-4 shadow-sm">
            {/* cancael section  */}
            <div
                onClick={() => {
                    setIsCancelDialogOpen(true);
                    setOrderId(order.id);
                }}
                className="absolute top-4 right-4"
            >
                <div className="group flex size-6 cursor-pointer items-center justify-center rounded-full border border-gray-500 hover:border-red-500 hover:bg-red-500">
                    <XIcon className="size-4 group-hover:text-white" />
                </div>
            </div>
            <div className="text-center">
                <h1 className="text-lg font-semibold">
                    รหัสการจอง : {order.preOrderNumber}
                </h1>
                <div className="mt-4 flex items-center justify-center gap-2">
                    <TextCardInfo
                        text="สถานะจ่ายเงิน"
                        value=""
                        status={order.paymentStatus}
                    />
                    <TextCardInfo text="สถานะ" value="" status={order.status} />
                </div>
            </div>

            <div className="mt-4 flex flex-col gap-1">
                <TextCardInfo
                    text="วันที่จอง"
                    value={new Date(order.reservationDate).toLocaleDateString()}
                />
                <TextCardInfo text="เวลา" value={order.reservationTime} />
                <TextCardInfo text="ชื่อลูกค้า" value={order.customerName} />
                <TextCardInfo text="เบอร์โทรศัพท์" value={order.phoneNumber} />
                <TextCardInfo
                    text="ผู้ใหญ่"
                    value={order.adultNumber.toString()}
                />
                <TextCardInfo
                    text="เด็ก"
                    value={order.childNumber.toString()}
                />
                <TextCardInfo text="ราคา" value={`${order.totalPrice} บาท`} />
                <TextCardInfo
                    text="โต๊ะที่"
                    value={`${order.tables
                        .map(table => table.tableNumber)
                        .join(', ')}`}
                />
            </div>

            <div className="mt-4 flex w-full flex-col gap-2">
                <Button
                    onClick={() => {
                        setOrderId(order.id);
                        setIsDialogOpen(true);
                    }}
                    variant="default"
                    className="rounded-full text-xs"
                >
                    ยืนยันการจอง
                </Button>
                <Button
                    variant="outline"
                    className="w-full rounded-full text-xs"
                    onClick={() => {
                        setIsPaymentDialogOpen(true);
                        setOrderId(order.id);
                    }}
                >
                    ดูสลิปการจ่ายเงิน
                </Button>
            </div>
        </div>
    );
}

export default OrderCard;
