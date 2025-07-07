import React from "react";
import { OrderHistory } from "../types";
import { cn } from "@/lib/utils";

function OrderHistoryCard({
    order,
    index,
}: {
    order: OrderHistory;
    index: number;
}) {
    return (
        <div className="border border-coffee-dark bg-coffee-light/50 rounded-md p-4">
            {/* date and time  */}
            <div className=" text-gray-500 flex items-center justify-between">
                <p className="text-lg text-black font-bold">
                    รอบที่ {index + 1}
                </p>
                <p className="text-sm">
                    {new Date(order.updatedAt).toLocaleString("th-TH", {
                        dateStyle: "medium",
                        timeStyle: "short",
                    })}
                </p>
            </div>

            <div className="mt-2">
                {order.orderItems.map((item, index) => (
                    <React.Fragment key={item.id}>
                        <OrderHistoryItemText
                            text={item.productName}
                            quantity={item.quantity}
                        />
                        {index < order.orderItems.length - 1 && ", "}
                    </React.Fragment>
                ))}
            </div>

            <div className="mt-2 flex items-center justify-end gap-2">
                <p className=" text-black font-bold ">{order.totalPrice} ฿</p>
            </div>
        </div>
    );
}

export default OrderHistoryCard;

const OrderHistoryItemText = ({
    text,
    quantity,
    className,
}: {
    text: string;
    quantity: number;
    className?: string;
}) => {
    return (
        <span className={cn("text-black text-sm", className)}>
            {text} ({quantity})
        </span>
    );
};
