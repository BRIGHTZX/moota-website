import { PaperclipIcon } from "lucide-react";
import React from "react";
import { TextCardInfo } from "@/components/TextCardInfo";

type ReservationDetailProps = {
    reservation: {
        id: string;
        preOrderNumber: string;
        customerName: string;
        phoneNumber: string;
        adultNumber: number;
        childNumber: number;
        reservationDate: string;
        reservationTime: string;
        table: {
            id: string;
            tableNumber: string;
        }[];
        paymentImage: string;
    };
};

function ReservationDetail({ reservation }: ReservationDetailProps) {
    return (
        <div className="flex h-fit rounded-xl w-full">
            <div className="w-full overflow-hidden rounded-xl border border-gray-300">
                <div className="flex items-center justify-center bg-gray-300 p-4">
                    <p className="text-2xl font-bold">
                        ข้อมูลรายละเอียดการจอง{" "}
                    </p>
                    <span className="ml-2">
                        <PaperclipIcon className="size-6" />
                    </span>
                </div>

                <div className="mt-10 flex flex-col gap-4 px-4 pb-10">
                    <TextCardInfo
                        text="วันที่ทำการจอง :"
                        value={
                            reservation?.reservationDate
                                ? new Date(
                                      reservation.reservationDate
                                  ).toLocaleDateString()
                                : "วันที่ไม่ระบุ"
                        }
                        textClassName="text-lg"
                        valueClassName="text-lg"
                    />

                    <TextCardInfo
                        text="เวลาที่ทำการจอง :"
                        value={reservation?.reservationTime}
                        textClassName="text-lg"
                        valueClassName="text-lg"
                    />

                    <TextCardInfo
                        text="จำนวนผู้ใหญ่ :"
                        value={
                            reservation?.adultNumber
                                ? String(reservation.adultNumber)
                                : "จำนวนไม่ระบุ"
                        }
                        textClassName="text-lg"
                        valueClassName="text-lg"
                    />

                    <TextCardInfo
                        text="จำนวนผู้เด็ก :"
                        value={
                            reservation?.childNumber
                                ? String(reservation.childNumber)
                                : "จำนวนไม่ระบุ"
                        }
                        textClassName="text-lg"
                        valueClassName="text-lg"
                    />

                    <TextCardInfo
                        text="หมายเลขโต๊ะที่ทำการจอง :"
                        value={
                            reservation?.table
                                ? reservation.table
                                      .map((table) => table.tableNumber)
                                      .join(", ")
                                : "โต๊ะไม่ระบุ"
                        }
                        textClassName="text-lg"
                        valueClassName="text-lg"
                    />

                    <TextCardInfo
                        text="ชื่อผู้จอง :"
                        value={
                            reservation?.customerName
                                ? reservation.customerName
                                : "ชื่อไม่ระบุ"
                        }
                        textClassName="text-lg"
                        valueClassName="text-lg"
                    />

                    <TextCardInfo
                        text="เบอร์โทรศัพท์ :"
                        value={
                            reservation?.phoneNumber
                                ? reservation.phoneNumber
                                : "เบอร์โทรศัพท์ไม่ระบุ"
                        }
                        textClassName="text-lg"
                        valueClassName="text-lg"
                    />
                </div>
            </div>
        </div>
    );
}

export default ReservationDetail;
