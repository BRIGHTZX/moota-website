"use client";
import { Button } from "@/components/ui/button";
import { useGetReservation } from "@/features/(client)/reservation/api/use-get-reservation";
import { useGetPreOrderId } from "@/features/(client)/reservation/hooks/get-preOrderId";
import { ArrowLeftIcon, CheckIcon, PaperclipIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function ReservationInfoPage() {
    const preOrderId = useGetPreOrderId();
    const {
        data: reservation,
        isLoading,
        isError,
    } = useGetReservation(preOrderId);

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error</div>;

    const reservationData = reservation?.result;

    return (
        <div className="min-h-screen w-screen">
            <div className="container mx-auto pt-30 pb-20">
                <div className="flex items-center justify-between gap-10">
                    <Button
                        asChild
                        variant="outline"
                        className="flex items-center gap-2 py-6 text-lg"
                    >
                        <Link href="/reservation">
                            <ArrowLeftIcon className="size-4" />
                            ย้อนกลับ
                        </Link>
                    </Button>
                    {/* {!isPaid && ( */}
                    <div>
                        <Button variant="coffeePrimary" className="py-6">
                            <CheckIcon className="size-4" />
                            <span className="text-xl">ยืนยันการจ่ายเงิน</span>
                        </Button>
                    </div>
                    {/* )} */}
                </div>
                <div className="mt-4 flex items-center gap-10">
                    <div className="flex items-center gap-2">
                        <h1 className="text-5xl">Order : </h1>
                        <p className="text-5xl">
                            {reservationData?.preOrderNumber}
                        </p>
                    </div>
                </div>

                <div className="mt-4 flex items-center gap-4">
                    <p className="text-lg">สั่งจองวันที่ : </p>
                    <p>
                        {reservationData?.createdAt
                            ? new Date(
                                  reservationData.createdAt
                              ).toLocaleString()
                            : "วันที่ไม่ระบุ"}
                    </p>
                </div>

                <div className="mt-10 flex gap-10">
                    <div className="flex-1">
                        <div className="flex size-full justify-end rounded-xl">
                            <div className="w-8/10 overflow-hidden rounded-xl border border-gray-300">
                                <div className="flex items-center justify-center bg-gray-300 p-4">
                                    <p className="text-2xl font-bold">
                                        ข้อมูลรายละเอียดการจอง{" "}
                                    </p>
                                    <span className="ml-2">
                                        <PaperclipIcon className="size-6" />
                                    </span>
                                </div>

                                <div className="mt-10 flex flex-col gap-4 px-4 pb-10">
                                    <TextInfo
                                        label="วันที่ทำการจอง :"
                                        value={
                                            reservationData?.reservationDate
                                                ? new Date(
                                                      reservationData.reservationDate
                                                  ).toLocaleDateString()
                                                : "วันที่ไม่ระบุ"
                                        }
                                    />

                                    <TextInfo
                                        label="เวลาที่ทำการจอง :"
                                        value={
                                            reservationData?.reservationTime
                                                ? reservationData.reservationTime
                                                : "เวลาไม่ระบุ"
                                        }
                                    />

                                    <TextInfo
                                        label="จำนวนผู้ใหญ่ :"
                                        value={
                                            reservationData?.adultNumber
                                                ? String(
                                                      reservationData.adultNumber
                                                  )
                                                : "จำนวนไม่ระบุ"
                                        }
                                    />

                                    <TextInfo
                                        label="จำนวนผู้เด็ก :"
                                        value={
                                            reservationData?.childNumber
                                                ? String(
                                                      reservationData.childNumber
                                                  )
                                                : "จำนวนไม่ระบุ"
                                        }
                                    />

                                    <TextInfo
                                        label="หมายเลขโต๊ะที่ทำการจอง :"
                                        value={
                                            reservationData?.table
                                                ? reservationData.table
                                                      .map(
                                                          (table) =>
                                                              table.tableNumber
                                                      )
                                                      .join(", ")
                                                : "โต๊ะไม่ระบุ"
                                        }
                                    />

                                    <TextInfo
                                        label="ชื่อผู้จอง :"
                                        value={
                                            reservationData?.customerName
                                                ? reservationData.customerName
                                                : "ชื่อไม่ระบุ"
                                        }
                                    />

                                    <TextInfo
                                        label="เบอร์โทรศัพท์ :"
                                        value={
                                            reservationData?.phoneNumber
                                                ? reservationData.phoneNumber
                                                : "เบอร์โทรศัพท์ไม่ระบุ"
                                        }
                                    />

                                    <TextInfo
                                        label="อีเมล :"
                                        value={
                                            reservationData?.email ??
                                            "อีเมลไม่ระบุ"
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1">
                        <div className="flex size-full h-full w-[80%] flex-col justify-start overflow-hidden rounded-xl border border-gray-300">
                            <div className="bg-gray-300 p-4">
                                <h1 className="text-center text-2xl font-bold">
                                    ยอดการชำระ
                                </h1>
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
                                <TextInfo
                                    label="ค่าจองโต๊ะ :"
                                    value={
                                        reservationData?.totalPrice
                                            ? reservationData.totalPrice.toString()
                                            : "ค่าจองไม่ระบุ"
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ReservationInfoPage;

const TextInfo = ({ label, value }: { label: string; value: string }) => {
    return (
        <div className="flex items-center">
            <p className="text-lg font-bold">{label}</p>
            <p className="ml-4">{value}</p>
        </div>
    );
};
