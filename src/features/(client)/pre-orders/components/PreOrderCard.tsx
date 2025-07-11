import { Button } from "@/components/ui/button";
import React from "react";
import { PreOrderType } from "../types";
import Link from "next/link";
import SeperateLine from "@/components/SeperateLine";
import { TextCardInfo } from "@/components/TextCardInfo";

function PreOrderCard({ preOrder }: { preOrder: PreOrderType }) {
    return (
        <div className="rounded-md border border-coffee-dark p-4">
            <div className="flex flex-col items-center justify-between">
                <p className="text-xl text-nowrap font-bold">
                    รหัสการจอง: {preOrder.preOrderNumber}
                </p>
                <div className="flex items-center gap-10">
                    <p className="text-sm text-nowrap text-gray-500 ">
                        วันที่จอง:{" "}
                        {new Date(
                            preOrder.reservationDate
                        ).toLocaleDateString()}
                    </p>
                </div>
            </div>

            <div className="mt-4 flex flex-col">
                <div className="flex-1 px-4 flex flex-col gap-2">
                    <TextCardInfo
                        text="รหัสการจอง: "
                        value={preOrder.preOrderNumber}
                    />
                    <TextCardInfo
                        text="วันที่จอง: "
                        value={new Date(
                            preOrder.reservationDate
                        ).toLocaleDateString()}
                    />
                    <TextCardInfo
                        text="เวลาจอง: "
                        value={preOrder.reservationTime}
                    />
                    <TextCardInfo
                        text="สถานะการชำระเงิน : "
                        value={""}
                        status={preOrder.paymentStatus}
                    />
                    <TextCardInfo
                        text="สถานะการจอง : "
                        value={""}
                        status={preOrder.status}
                    />
                </div>

                <SeperateLine className="my-4 w-full h-[1px] bg-gray-300" />

                <div className="flex-1 px-4 flex flex-col gap-2">
                    <TextCardInfo
                        text="ชื่อผู้จอง : "
                        value={preOrder.customerName}
                    />
                    <TextCardInfo
                        text="เบอร์โทรศัพท์ : "
                        value={preOrder.phoneNumber}
                    />
                    <TextCardInfo
                        text="จำนวนผู้ใหญ่ : "
                        value={preOrder.adultNumber.toString()}
                    />
                    <TextCardInfo
                        text="จำนวนเด็ก : "
                        value={preOrder.childNumber.toString()}
                    />
                    <TextCardInfo
                        text="ที่นั่ง : "
                        value={preOrder.tables
                            .map((table) => table.tableNumber)
                            .join(", ")}
                    />
                </div>
            </div>
            <div className="flex mt-4 items-center justify-end gap-2">
                <Button asChild variant="coffeePrimary">
                    <Link href={`/reservation/info/${preOrder.id}`}>
                        รายละเอียดการจอง
                    </Link>
                </Button>
            </div>
        </div>
    );
}

export default PreOrderCard;
