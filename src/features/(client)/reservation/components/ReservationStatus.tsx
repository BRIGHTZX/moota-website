import { cn } from "@/lib/utils";
import React from "react";
import { PreOrderPaymentStatus, PreOrderStatus } from "../../pre-orders/types";

function ReservationStatus({
    status,
    paymentStatus,
}: {
    status: PreOrderStatus;
    paymentStatus: PreOrderPaymentStatus;
}) {
    console.log(status, paymentStatus);
    const statusColor = {
        pending: "border-yellow-500",
        confirmed: "border-green-500",
        canceled: "border-red-500",
    };

    const statusBgColor = {
        pending: "bg-yellow-500",
        confirmed: "bg-green-500",
        canceled: "bg-red-500",
    };

    const statusText = {
        pending: "รอการยืนยัน",
        confirmed: "ยืนยันแล้ว",
        canceled: "ยกเลิก",
    };

    const paymentStatusColor = {
        unpaid: "border-yellow-500",
        paid: "border-green-500",
    };

    const paymentStatusBgColor = {
        unpaid: "bg-yellow-500",
        paid: "bg-green-500",
    };

    const paymentStatusText = {
        unpaid: "รอการชำระเงิน",
        paid: "ชำระเงินแล้ว",
    };

    return (
        <div className="flex items-center gap-2">
            <div
                className={cn(
                    "rounded-full flex items-center gap-2 py-2 px-4 border",
                    paymentStatusColor[paymentStatus]
                )}
            >
                <div
                    className={cn(
                        "size-2 rounded-full",
                        paymentStatusBgColor[paymentStatus]
                    )}
                />
                <p className="text-xs md:text-sm">
                    {paymentStatusText[paymentStatus]}
                </p>
            </div>
            <div
                className={cn(
                    "rounded-full flex items-center gap-2 py-2 px-4 border",
                    statusColor[status]
                )}
            >
                <div
                    className={cn("size-2 rounded-full", statusBgColor[status])}
                />
                <p className="text-xs md:text-sm">{statusText[status]}</p>
            </div>
        </div>
    );
}

export default ReservationStatus;
