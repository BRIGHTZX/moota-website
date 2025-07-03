import { Button } from "@/components/ui/button";
import React from "react";
import { OrderType } from "../types";
import Link from "next/link";
import { TextCardInfo } from "@/components/TextCardInfo";
import ConfirmOrder from "./ConfirmOrder";

type OrderCardProps = {
    order: OrderType;
};

function OrderCard({ order }: OrderCardProps) {
    return (
        <div className="border mt-4 border-coffee-dark p-4 rounded-md">
            <div className="">
                <h1 className="text-lg font-semibold">
                    Order ID : {order.preOrderNumber}
                </h1>
            </div>

            <div className="flex flex-col gap-1 mt-4">
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
                        .map((table) => table.tableNumber)
                        .join(", ")}`}
                />
                <TextCardInfo
                    text="สถานะจ่ายเงิน"
                    value=""
                    status={order.paymentStatus}
                />
                <TextCardInfo text="สถานะ" value="" status={order.status} />
            </div>

            <div className="mt-4 w-full flex flex-col gap-2">
                <ConfirmOrder orderId={order.id} />
                <Button
                    asChild
                    variant="coffeeOutline"
                    className="w-full rounded-full"
                >
                    <Link href={`/admin/orders/${order.id}`}>ดูรายละเอียด</Link>
                </Button>
            </div>
        </div>
    );
}

export default OrderCard;
