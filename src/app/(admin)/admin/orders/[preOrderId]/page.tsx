"use client";
import PageLoader from "@/components/PageLoader";
import SeperateLine from "@/components/SeperateLine";
import { TextCardInfo } from "@/components/TextCardInfo";
import TextHeader from "@/components/TextHeader";
import { Button } from "@/components/ui/button";
import { useGetOrder } from "@/features/(admin)/orders/api/use-get-order";
import ConfirmOrder from "@/features/(admin)/orders/components/ConfirmOrder";
import { useGetPreOrderId } from "@/features/(client)/reservation/hooks/get-preOrderId";
import { ArrowLeftIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function OrderDetailPage() {
    const preOrderId = useGetPreOrderId();
    const { data: orderData, isLoading, isError } = useGetOrder(preOrderId);

    if (isLoading) {
        return <PageLoader className="h-[300px]" />;
    }

    if (isError) {
        return <div>Error</div>;
    }
    return (
        <div className="p-4 mt-14 mb-20">
            <div className="flex items-center gap-2">
                <Button
                    variant="coffeeOutline"
                    className="rounded-full"
                    asChild
                >
                    <Link href="/admin/orders">
                        <ArrowLeftIcon className="size-4" />
                    </Link>
                </Button>
                <TextHeader text="รายละเอียดออเดอร์" />
            </div>

            <SeperateLine className="w-full my-4" />

            <div className="flex flex-col gap-1 mt-4">
                <TextCardInfo
                    text="วันที่จอง"
                    value={
                        orderData?.reservationDate
                            ? new Date(
                                  orderData?.reservationDate
                              ).toLocaleDateString()
                            : "-"
                    }
                />
                <TextCardInfo
                    text="เวลา"
                    value={orderData?.reservationTime ?? "-"}
                />
                <TextCardInfo
                    text="ชื่อลูกค้า"
                    value={orderData?.customerName ?? "-"}
                />
                <TextCardInfo
                    text="เบอร์โทรศัพท์"
                    value={orderData?.phoneNumber ?? "-"}
                />
                <TextCardInfo
                    text="ผู้ใหญ่"
                    value={orderData?.adultNumber.toString() ?? "-"}
                />
                <TextCardInfo
                    text="เด็ก"
                    value={orderData?.childNumber.toString() ?? "-"}
                />
                <TextCardInfo
                    text="ราคา"
                    value={`${orderData?.totalPrice ?? "-"} บาท`}
                />
                <TextCardInfo
                    text="สถานะจ่ายเงิน"
                    value=""
                    status={orderData?.paymentStatus ?? "-"}
                />
                <TextCardInfo
                    text="สถานะ"
                    value=""
                    status={orderData?.status ?? "-"}
                />
            </div>

            <div className="mt-4">
                <p className="text-lg font-semibold">หลักฐานการชำระเงิน</p>

                <div className="border mt-4 border-gray-200 w-full h-[300px] rounded-md p-4">
                    <Image
                        src={orderData?.paymentImage ?? ""}
                        alt="payment-proof"
                        className="object-contain"
                        width={1000}
                        height={1000}
                    />
                </div>
            </div>

            <div className="mt-4">
                <ConfirmOrder />
            </div>
        </div>
    );
}

export default OrderDetailPage;
