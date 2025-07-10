import React from "react";
import { AllCheckoutStatusType } from "../types";

function CheckoutStatusBadge({ status }: { status: AllCheckoutStatusType }) {
    const statusColor = {
        open: "bg-gray-500",
        partial: "bg-yellow-500",
        closed: "bg-green-500",
    };

    const statusText = {
        open: "รอชำระเงิน",
        partial: "ชำระเงินบางส่วน",
        closed: "ชำระเงินแล้ว",
    };

    return (
        <div
            className={`${statusColor[status]} text-white px-2 py-1 rounded-md flex items-center gap-2`}
        >
            <p className="text-xs font-medium">{statusText[status]}</p>
        </div>
    );
}

export default CheckoutStatusBadge;
