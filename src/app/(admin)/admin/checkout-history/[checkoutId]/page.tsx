"use client";
import AdminPageWrapper from "@/components/AdminPageWrapper";
import SeperateLine from "@/components/SeperateLine";
import { TextCardInfo } from "@/components/TextCardInfo";
import TextHeader from "@/components/TextHeader";
import { Button } from "@/components/ui/button";
import { useGetCheckoutHistory } from "@/features/(admin)/checkout-history/api/use-get-checkout-history";
import PaymentBadge from "@/features/(admin)/checkout-history/components/PaymentMethodBadge";
import { useGetCheckoutId } from "@/features/(admin)/checkout-history/hooks/get-checkoutId";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

function CheckoutHistoryDetailPage() {
    const checkoutId = useGetCheckoutId();
    const { data: checkoutHistory } = useGetCheckoutHistory({
        checkoutId,
    });

    console.log(checkoutHistory);
    return (
        <AdminPageWrapper>
            <div className="flex itms-center gap-2">
                <Button asChild variant="outline" size="sm">
                    <Link href="/admin/checkout-history">
                        <ArrowLeftIcon className="w-4 h-4" />
                    </Link>
                </Button>
                <TextHeader text="รายละเอียดการชำระเงิน" />
            </div>

            <SeperateLine className="my-4" />

            {/* Date */}
            <div className="flex items-center gap-2 mt-4">
                <p className="text-xs font-semibold">วันที่ชำระเงิน</p>
                <p className="text-xs font-light text-gray-500">
                    {new Date(checkoutHistory?.updatedAt ?? "").toLocaleString(
                        "th-TH",
                        {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                        }
                    )}
                </p>
            </div>

            <div className="flex flex-col gap-4 mt-4">
                <div className="border border-gray-500 rounded-md relative overfow-hidden">
                    <p className="text-sm font-semibold bg-gray-100 text-center rounded-t-md border-b p-2">
                        ข้อมูลการชำระเงิน
                    </p>

                    <div className="flex flex-col gap-2 p-4">
                        <TextCardInfo
                            text="ชื่อลูกค้า"
                            value={checkoutHistory?.customerName}
                        />
                        <TextCardInfo
                            text="จำนวนผู้ใหญ่"
                            value={`${checkoutHistory?.paidAdultNumber} คน`}
                        />
                        <TextCardInfo
                            text="จำนวนผู้เด็ก"
                            value={`${checkoutHistory?.paidChildNumber} คน`}
                        />
                        <TextCardInfo
                            text="ราคารวมออเดอร์"
                            value={`${checkoutHistory?.totalOrderPrice?.toLocaleString()} บาท`}
                        />
                        <TextCardInfo
                            text="ส่วนลด"
                            value={`${checkoutHistory?.totalDiscount?.toLocaleString()} บาท`}
                        />
                        <TextCardInfo
                            text="ราคารวมทั้งหมด"
                            value={`${checkoutHistory?.totalAmount?.toLocaleString()} บาท`}
                        />
                        <PaymentBadge
                            paymentMethod={checkoutHistory?.paymentMethod ?? ""}
                        />
                    </div>
                </div>

                <div className="border border-gray-500 rounded-md relative overfow-hidden">
                    <p className="text-sm font-semibold bg-gray-100 text-center rounded-t-md border-b p-2">
                        ประวัติออเดอร์
                    </p>

                    <div className="flex flex-col gap-2 p-4">
                        {checkoutHistory?.checkoutInfos?.map((item) => (
                            <TextCardInfo
                                key={item.productId}
                                text={
                                    <>
                                        <span className="font-semibold">
                                            {item.productName}
                                        </span>
                                        <span className="text-xs ml-2 font-light text-gray-500">
                                            x {item.quantity}
                                        </span>
                                    </>
                                }
                                value={`${item.totalPrice?.toLocaleString()} บาท`}
                            />
                        ))}
                        <SeperateLine className="my-2" />
                        <TextCardInfo
                            text="ราคารวมทั้งหมด"
                            value={`${checkoutHistory?.totalOrderPrice?.toLocaleString()} บาท`}
                            valueClassName="font-semibold"
                        />
                    </div>
                </div>
            </div>
        </AdminPageWrapper>
    );
}

export default CheckoutHistoryDetailPage;
