import { Button } from "@/components/ui/button";
import React from "react";
import { PreOrderType } from "../types";
import Link from "next/link";
import SeperateLine from "@/components/SeperateLine";
import { HeaderInfo, TextInfo } from "@/components/TextInfo";

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
                <div className="flex-1 px-4">
                    <div className="flex">
                        <div className="w-[40%]">
                            <HeaderInfo value="Order ID: " />
                            <HeaderInfo value="Order Date: " />
                            <HeaderInfo value="Order Time: " />
                            <HeaderInfo value="Order Status : " />
                            <HeaderInfo value="Payment Status: " />
                        </div>
                        <div className="col-span-1">
                            <TextInfo value={preOrder.preOrderNumber} />
                            <TextInfo
                                value={new Date(
                                    preOrder.reservationDate
                                ).toLocaleDateString()}
                            />
                            <TextInfo value={preOrder.reservationTime} />
                            <TextInfo value={preOrder.status} />
                            <TextInfo value={preOrder.paymentStatus} />
                        </div>
                    </div>
                </div>

                <SeperateLine className="sm:hidden max-sm:my-4 w-full h-[1px] bg-gray-300" />

                <div className="flex-1 px-4">
                    <div className="flex">
                        <div className="w-[40%]">
                            <HeaderInfo value="Name : " />
                            <HeaderInfo value="Phone : " />
                            <HeaderInfo value="Adult : " />
                            <HeaderInfo value="Child : " />
                            <HeaderInfo value="Table : " />
                        </div>
                        <div className="col-span-1">
                            <TextInfo value={preOrder.customerName} />
                            <TextInfo value={preOrder.phoneNumber} />
                            <TextInfo value={preOrder.adultNumber.toString()} />
                            <TextInfo value={preOrder.childNumber.toString()} />
                            <TextInfo
                                value={preOrder.tables
                                    .map((table) => table.tableNumber)
                                    .join(", ")}
                            />
                        </div>
                    </div>
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
