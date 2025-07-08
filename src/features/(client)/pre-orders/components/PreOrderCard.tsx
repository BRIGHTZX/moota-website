import { Button } from "@/components/ui/button";
import React from "react";
import { PreOrderType } from "../types";
import Link from "next/link";
import SeperateLine from "@/components/SeperateLine";
import { TextCardInfo } from "@/components/TextCardInfo";

function PreOrderCard({ preOrder }: { preOrder: PreOrderType }) {
    return (
        <div className="rounded-md border border-coffee-dark p-4">
            <div className="flex items-center justify-between">
                <h1 className="text-xl">Order ID: {preOrder.preOrderNumber}</h1>
                <div className="flex items-center gap-10">
                    <p className="text-sm text-gray-500">
                        Order Date:{" "}
                        {new Date(
                            preOrder.reservationDate
                        ).toLocaleDateString()}
                    </p>
                </div>
            </div>

            <div className="mt-4 flex flex-col sm:flex-row">
                <div className="flex-1 px-4 flex flex-col gap-2">
                    <TextCardInfo
                        text="Order ID: "
                        value={preOrder.preOrderNumber}
                        textClassName="text-lg text-nowrap"
                        valueClassName="text-lg"
                    />
                    <TextCardInfo
                        text="Order Date: "
                        value={new Date(
                            preOrder.reservationDate
                        ).toLocaleDateString()}
                        textClassName="text-lg text-nowrap"
                        valueClassName="text-lg"
                    />
                    <TextCardInfo
                        text="Order Time: "
                        value={preOrder.reservationTime}
                        textClassName="text-lg text-nowrap"
                        valueClassName="text-lg"
                    />
                    <TextCardInfo
                        text="Order Status : "
                        value={preOrder.status}
                        textClassName="text-lg text-nowrap"
                        valueClassName="text-lg"
                    />
                    <TextCardInfo
                        text="Payment Status: "
                        value={preOrder.paymentStatus}
                        textClassName="text-lg text-nowrap"
                        valueClassName="text-lg"
                    />
                </div>

                <SeperateLine className="sm:hidden max-sm:my-4 w-full h-[1px] bg-gray-300" />

                <div className="flex-1 px-4 flex flex-col gap-2">
                    <TextCardInfo
                        text="Name : "
                        value={preOrder.customerName}
                        textClassName="text-lg"
                        valueClassName="text-lg"
                    />
                    <TextCardInfo
                        text="Phone : "
                        value={preOrder.phoneNumber}
                        textClassName="text-lg"
                        valueClassName="text-lg"
                    />
                    <TextCardInfo
                        text="Adult : "
                        value={preOrder.adultNumber.toString()}
                        textClassName="text-lg"
                        valueClassName="text-lg"
                    />
                    <TextCardInfo
                        text="Child : "
                        value={preOrder.childNumber.toString()}
                        textClassName="text-lg"
                        valueClassName="text-lg"
                    />
                    <TextCardInfo
                        text="Table : "
                        value={preOrder.tables
                            .map((table) => table.tableNumber)
                            .join(", ")}
                        textClassName="text-lg"
                        valueClassName="text-lg"
                    />
                </div>
            </div>
            <div className="flex items-center justify-end gap-2">
                <Button asChild variant="coffeePrimary">
                    <Link href={`/reservation/info/${preOrder.id}`}>
                        More Detail
                    </Link>
                </Button>
            </div>
        </div>
    );
}

export default PreOrderCard;
