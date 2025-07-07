import React from "react";
import { OrderHistory } from "../types";

function OrderHistoryCard({ order }: { order: OrderHistory }) {
    return (
        <div className="border border-coffee-dark bg-coffee-light rounded-md p-4">
            {/* date and time  */}
            <div className="text-end text-sm text-gray-500">
                <p>12/12/2566 12:00</p>
            </div>
        </div>
    );
}

export default OrderHistoryCard;
