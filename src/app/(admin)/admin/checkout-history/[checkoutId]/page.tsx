"use client";
import AdminPageWrapper from "@/components/AdminPageWrapper";
import SeperateLine from "@/components/SeperateLine";
import { TextCardInfo } from "@/components/TextCardInfo";
import TextHeader from "@/components/TextHeader";
import { Button } from "@/components/ui/button";
import { useGetCheckoutHistory } from "@/features/(admin)/checkout-history/api/use-get-checkout-history";
import PaymentBadge from "@/features/(admin)/checkout-history/components/PaymentMethodBadge";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { use } from "react";

function CheckoutHistoryDetailPage({
    params,
}: {
    params: Promise<{ checkoutId: string }>;
}) {
    const { checkoutId } = use(params);
    const searchParams = useSearchParams();
    const returnUrl = searchParams.get("returnUrl");
    const { data: checkoutHistory } = useGetCheckoutHistory({
        checkoutId,
    });

    const checkoutStatus = checkoutHistory?.active?.status;

    return (
        <AdminPageWrapper>
            <div className="relative">
                <div className="absolute top-0 left-0">
                    <Button asChild variant="outline" size="sm">
                        <Link href={returnUrl ?? "/admin/checkout-history"}>
                            <ArrowLeftIcon className="w-4 h-4" />
                        </Link>
                    </Button>
                </div>
                <TextHeader
                    text="รายละเอียดการชำระเงิน"
                    className="text-center"
                />
            </div>

            <SeperateLine className="my-4" />

            {/* Date */}
            <div className="flex items-center justify-between gap-2 mt-4">
                <div className="flex items-center gap-2">
                    <p className="text-xs font-semibold">วันที่ชำระเงิน</p>
                    <p className="text-xs font-light text-gray-500">
                        {new Date(
                            checkoutHistory?.updatedAt ?? ""
                        ).toLocaleString("th-TH", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                        })}
                    </p>
                </div>
                {/* Checkout Status */}
                <CheckoutStatusBadge status={checkoutStatus ?? ""} />
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

const CheckoutStatusBadge = ({ status }: { status: string }) => {
    const statusColor =
        status === "closed"
            ? "bg-green-500"
            : status === "partial"
            ? "bg-amber-500"
            : "bg-red-500";

    const statusText =
        status === "closed"
            ? "ชำระเงินครบถ้วน"
            : status === "partial"
            ? "ชำระเงินบางส่วน"
            : "ชำระเงินไม่ครบถ้วน";

    return (
        <div className={`text-xs font-semibold ${statusColor} rounded-md p-1`}>
            <p className="text-white">{statusText}</p>
        </div>
    );
};
