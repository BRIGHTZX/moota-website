import React from "react";
import { CheckoutHistoryType } from "../types";
import { TextCardInfo } from "@/components/TextCardInfo";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import PaymentBadge from "./PaymentMethodBadge";

function CheckoutHistoryCard({
    checkoutHistory,
}: {
    checkoutHistory: CheckoutHistoryType;
}) {
    return (
        <div className="flex flex-col gap-2 border border-gray-300 shadow-sm rounded-md p-4 bg-white">
            <div className="flex items-center justify-end gap-2">
                <p className="text-xs text-gray-500">
                    {new Date(checkoutHistory.updatedAt).toLocaleDateString(
                        "th-TH",
                        { year: "numeric", month: "long", day: "numeric" }
                    )}
                </p>
                <p className="text-xs text-gray-500">
                    {new Date(checkoutHistory.updatedAt).toLocaleTimeString(
                        "th-TH",
                        { hour: "2-digit", minute: "2-digit" }
                    )}
                </p>
            </div>
            <TextCardInfo
                text="ชื่อลูกค้า"
                value={checkoutHistory.customerName}
            />
            <TextCardInfo
                text="จำนวนผู้ใหญ่"
                value={`${checkoutHistory.paidAdultNumber.toString()} คน`}
            />
            <TextCardInfo
                text="จำนวนเด็ก"
                value={`${checkoutHistory.paidChildNumber.toString()} คน`}
            />
            <TextCardInfo
                text="ราคาออร์เดอร์"
                value={`${checkoutHistory.totalOrderPrice.toString()} บาท`}
            />
            <TextCardInfo
                text="ราคารวม"
                value={`${checkoutHistory.totalAmount.toString()} บาท`}
            />

            <PaymentBadge paymentMethod={checkoutHistory.paymentMethod} />

            <Button asChild variant="outline" className="w-full" size="sm">
                <Link href={`/admin/checkout-history/${checkoutHistory.id}`}>
                    <span className="text-sm font-medium">ดูรายละเอียด</span>
                </Link>
            </Button>
        </div>
    );
}

export default CheckoutHistoryCard;
