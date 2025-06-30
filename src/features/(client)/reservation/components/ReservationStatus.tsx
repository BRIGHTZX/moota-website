import { cn } from "@/lib/utils";
import React from "react";

function ReservationStatus({
    status,
    paymentStatus,
}: {
    status: "pending" | "confirmed" | "cancelled";
    paymentStatus: "pending" | "paid";
}) {
    console.log(status, paymentStatus);
    const statusColor = {
        pending: "border-yellow-500",
        confirmed: "border-green-500",
        cancelled: "border-red-500",
    };

    const statusBgColor = {
        pending: "bg-yellow-500",
        confirmed: "bg-green-500",
        cancelled: "bg-red-500",
    };

    const statusText = {
        pending: "รอการยืนยัน",
        confirmed: "ยืนยันแล้ว",
        cancelled: "ยกเลิก",
    };

    const paymentStatusColor = {
        pending: "border-yellow-500",
        paid: "border-green-500",
    };

    const paymentStatusBgColor = {
        pending: "bg-yellow-500",
        paid: "bg-green-500",
    };

    const paymentStatusText = {
        pending: "รอการชำระเงิน",
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
                <p className="text-sm">{paymentStatusText[paymentStatus]}</p>
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
                <p className="text-sm">{statusText[status]}</p>
            </div>
        </div>
    );
}

export default ReservationStatus;
