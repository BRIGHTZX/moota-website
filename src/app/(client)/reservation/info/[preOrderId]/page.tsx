"use client";
import PageWrapper from "@/components/PageWrapper";
import { TextCardInfo } from "@/components/TextCardInfo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    PreOrderPaymentStatus,
    PreOrderStatus,
} from "@/features/(client)/pre-orders/types";
import { useGetReservation } from "@/features/(client)/reservation/api/use-get-reservation";
import { useUpdatePaymentImage } from "@/features/(client)/reservation/api/use-update-paymentImage";
import ReservationDetail from "@/features/(client)/reservation/components/ReservationDetail";
import ReservationStatus from "@/features/(client)/reservation/components/ReservationStatus";
import { useGetPreOrderId } from "@/features/(client)/reservation/hooks/get-preOrderId";
import { cn } from "@/lib/utils";
import { ArrowLeftIcon, CheckIcon, XIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { toast } from "sonner";

function ReservationInfoPage() {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [paymentImage, setPaymentImage] = useState<File | null>(null);
    const preOrderId = useGetPreOrderId();
    const {
        data: reservation,
        isLoading: isLoadingReservation,
        isError: isErrorReservation,
    } = useGetReservation(preOrderId);

    const {
        mutate: updatePaymentImage,
        isPending: isUpdatingPaymentImage,
        isError: isUpdatePaymentImageError,
    } = useUpdatePaymentImage(preOrderId);

    if (isLoadingReservation) return <div>Loading...</div>;
    if (isErrorReservation || isUpdatePaymentImageError)
        return <div>Error</div>;

    const isLoading = isLoadingReservation || isUpdatingPaymentImage;

    const reservationData = reservation?.result;

    const handleUploadPaymentImage = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setPaymentImage(file);
        }
    };

    const handleDeletePaymentImage = () => {
        setPaymentImage(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleConfirmPayment = () => {
        if (!paymentImage) {
            toast.error("กรุณาอัพโหลกฐานการชำระเงิน");
            return;
        }

        updatePaymentImage({
            form: {
                paymentImage: paymentImage,
            },
            param: {
                preOrderId,
            },
        });
    };
    return (
        <PageWrapper>
            <div className="flex items-center justify-between gap-10">
                <Button
                    asChild
                    variant="outline"
                    className="flex items-center gap-2 text-sm md:text-lg"
                    disabled={isLoading}
                >
                    <Link href="/pre-orders">
                        <ArrowLeftIcon className="size-4" />
                    </Link>
                </Button>
                {/* )} */}
            </div>
            <div className="mt-4 flex items-center max-sm:justify-center flex-wrap gap-4">
                <div className="flex items-center gap-2">
                    <h1 className="text-2xl md:text-5xl text-nowrap">
                        Order :{" "}
                    </h1>
                    <p className="text-2xl md:text-5xl text-nowrap">
                        {reservationData?.preOrderNumber}
                    </p>
                </div>

                <ReservationStatus
                    status={reservationData?.status as PreOrderStatus}
                    paymentStatus={
                        reservationData?.paymentStatus as PreOrderPaymentStatus
                    }
                />
            </div>

            <div className="mt-4 flex items-center gap-4 max-sm:justify-center">
                <p className="text-sm md:text-lg text-nowrap">
                    สั่งจองวันที่ :{" "}
                </p>
                <p className="text-nowrap">
                    {reservationData?.createdAt
                        ? new Date(reservationData.createdAt).toLocaleString()
                        : "วันที่ไม่ระบุ"}
                </p>
            </div>

            <div className="mt-10 flex flex-col md:flex-row gap-10">
                <div className="flex-1">
                    <ReservationDetail
                        reservation={{
                            id: reservationData?.id ?? "-",
                            preOrderNumber:
                                reservationData?.preOrderNumber ?? "-",
                            customerName: reservationData?.customerName ?? "-",
                            phoneNumber: reservationData?.phoneNumber ?? "-",
                            adultNumber: reservationData?.adultNumber ?? 0,
                            childNumber: reservationData?.childNumber ?? 0,
                            reservationDate:
                                reservationData?.reservationDate ?? "-",
                            reservationTime:
                                reservationData?.reservationTime ?? "-",
                            table: reservationData?.table ?? [],
                            paymentImage: reservationData?.paymentImage ?? "-",
                        }}
                    />
                </div>
                <div className="flex-1">
                    <div className="flex size-full h-full  flex-col  overflow-hidden rounded-xl border border-gray-300">
                        <div className="bg-gray-300 p-4">
                            <p className="text-center text-lg md:text-2xl font-bold">
                                ยอดการชำระ
                            </p>
                        </div>
                        <div className="flex h-fit justify-center">
                            <div className="mb-4 h-[300px] w-full border-b border-gray-300 p-4">
                                <Image
                                    src="/qr-payment.jpg"
                                    alt="qr-payment"
                                    width={1000}
                                    height={1000}
                                    className="h-full w-full object-contain"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-4 rounded-xl p-4">
                            <TextCardInfo
                                text="ค่าจองโต๊ะ :"
                                value={
                                    reservationData?.totalPrice
                                        ? reservationData.totalPrice.toString()
                                        : "ค่าจองไม่ระบุ"
                                }
                            />

                            {!paymentImage &&
                                !reservationData?.paymentImage && (
                                    <Button
                                        variant="coffeePrimary"
                                        className="w-full text-sm md:text-md"
                                        onClick={handleUploadPaymentImage}
                                        disabled={isLoading}
                                    >
                                        Upload หลักฐานการชำระเงิน
                                    </Button>
                                )}

                            <Input
                                ref={fileInputRef}
                                type="file"
                                hidden
                                onChange={handleFileChange}
                            />

                            {/* Section show payment image */}
                            {paymentImage && !reservationData?.paymentImage && (
                                <div className="flex flex-col gap-4">
                                    <div className="flex items-center justify-between">
                                        <p className="text-lg font-bold">
                                            หลักฐานการชำระเงิน
                                        </p>
                                        {/* {!isPaid && ( */}
                                        {paymentImage &&
                                            reservationData?.paymentImage ===
                                                null && (
                                                <div>
                                                    <Button
                                                        variant="coffeePrimary"
                                                        disabled={isLoading}
                                                        onClick={
                                                            handleConfirmPayment
                                                        }
                                                    >
                                                        <CheckIcon className="size-4" />
                                                        <span className="hidden md:block">
                                                            ยืนยันการจ่ายเงิน
                                                        </span>
                                                        <span className="block md:hidden">
                                                            ยืนยัน
                                                        </span>
                                                    </Button>
                                                </div>
                                            )}
                                    </div>

                                    <div className="relative border overflow-hidden rounded-lg h-[500px] w-full flex flex-col gap-2">
                                        <Image
                                            fill
                                            className={cn("object-cover")}
                                            src={URL.createObjectURL(
                                                paymentImage
                                            )}
                                            alt="payment-image"
                                        />

                                        <Button
                                            disabled={isLoading}
                                            onClick={handleDeletePaymentImage}
                                            className="absolute top-4 hover:bg-gray-100 right-4 border w-fit rounded-lg bg-white"
                                        >
                                            <XIcon className="size-6 text-red-500" />
                                        </Button>
                                    </div>
                                </div>
                            )}

                            {reservationData?.paymentImage && (
                                <div className="flex flex-col h-[500px] gap-4">
                                    <p className="text-lg font-bold">
                                        หลักฐานการชำระเงิน
                                    </p>
                                    <Image
                                        src={reservationData.paymentImage}
                                        alt="payment-image"
                                        width={1000}
                                        height={1000}
                                        className="h-full w-full object-contain"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </PageWrapper>
    );
}

export default ReservationInfoPage;
