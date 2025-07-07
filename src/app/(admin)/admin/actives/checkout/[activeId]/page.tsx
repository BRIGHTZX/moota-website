"use client";

import { TextCardInfo } from "@/components/TextCardInfo";
import TextHeader from "@/components/TextHeader";
import { Button } from "@/components/ui/button";
import { useGetCheckoutInfo } from "@/features/(admin)/checkout/api/use-get-checkoutInfo";
import { useGetActiveId } from "@/features/(admin)/checkout/hooks/use-getActiveId";
import { ActiveInfo } from "@/features/(admin)/checkout/types";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

function CheckoutPage() {
    const activeId = useGetActiveId();
    const { data: checkoutInfo } = useGetCheckoutInfo(activeId);

    return (
        <div className="p-4 pt-20 pb-8 relative h-[calc(100vh-5rem)]  overflow-y-auto">
            <div className="flex items-center gap-4">
                <Button asChild variant="outline" className="size-8">
                    <Link href="/admin/actives">
                        <ArrowLeftIcon className="w-6 h-6" />
                    </Link>
                </Button>

                <TextHeader text={`คิดเงิน`} />
            </div>

            {/* Customer Info */}
            <div className="flex flex-col gap-2 mt-4">
                <div className="flex flex-col gap-2 border border-gray-500 rounded-md p-4">
                    <TextCardInfo
                        text="ชื่อลูกค้า"
                        value={checkoutInfo?.customerName ?? ""}
                    />
                    <TextCardInfo
                        text="จำนวนผู้ใหญ่"
                        value={checkoutInfo?.adultNumber?.toString() ?? ""}
                    />
                    <TextCardInfo
                        text="จำนวนเด็ก"
                        value={checkoutInfo?.childNumber?.toString() ?? ""}
                    />
                </div>
            </div>

            {/* Table Selector */}
            <div className="flex flex-col gap-2 mt-4">
                <TextHeader text="โต๊ะที่กำลังทำงาน" className="text-md" />
                <div className="grid grid-cols-4 gap-2">
                    {checkoutInfo?.activeInfos?.map((info: ActiveInfo) => (
                        <TableSelector key={info.activeInfoId} tables={info} />
                    ))}
                </div>
            </div>

            {/* Order List */}
            <div></div>

            {/* People Count Selector */}
            <div></div>

            {/* Payment Method */}
            <div></div>

            {/* Action Buttons */}
            <div></div>
        </div>
    );
}

export default CheckoutPage;

const TableSelector = ({ tables }: { tables: ActiveInfo }) => {
    return (
        <div className="border border-coffee-dark rounded-md p-4 bg-coffee-light w-full flex items-center justify-center">
            <p className="text-sm font-bold">{tables.tableNumber}</p>
        </div>
    );
};
