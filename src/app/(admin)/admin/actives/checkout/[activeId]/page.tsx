"use client";

import PageLoader from "@/components/PageLoader";
import { TextCardInfo } from "@/components/TextCardInfo";
import TextHeader from "@/components/TextHeader";
import { Button } from "@/components/ui/button";
import { useGetCheckoutOrderLists } from "@/features/(admin)/checkout/api/use-get-checkout-orderLists";
import { useGetCheckoutInfo } from "@/features/(admin)/checkout/api/use-get-checkoutInfo";
import SelectedPeople from "@/features/(admin)/checkout/components/SelectedPeople";
import TableSelector from "@/features/(admin)/checkout/components/SelectedTable";
import TotalProductCard from "@/features/(admin)/checkout/components/TotalProductCard";
import { useGetActiveId } from "@/features/(admin)/checkout/hooks/use-getActiveId";
import {
    ActiveInfo,
    PaymentMethod,
    SelectedTable,
    TotalProduct,
} from "@/features/(admin)/checkout/types";
import { Switch } from "@/components/ui/switch";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import SeperateLine from "@/components/SeperateLine";
import SelectedPaymentMethod from "@/features/(admin)/checkout/components/SelectedPaymentMethod";

function CheckoutPage() {
    const activeId = useGetActiveId();
    const [adult, setAdult] = useState<number>(0);
    const [child, setChild] = useState<number>(0);
    const [selectedTable, setSelectedTable] = useState<SelectedTable[]>([]);
    const [birthDate, setBirthDate] = useState<boolean>(false);
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cash");
    // Customer Info and Table Selector
    const { data: checkoutInfo } = useGetCheckoutInfo(activeId);

    // Order List
    const { data: orderList, isLoading: isLoadingOrderList } =
        useGetCheckoutOrderLists(
            selectedTable?.map((info) => info.activeInfoId) ?? []
        );

    // function calculate
    const ADULT_PRICE = 199;
    const CHILD_PRICE = 129;

    const totalPriceAdult = (adult: number) => {
        return (adult * ADULT_PRICE).toFixed(2);
    };
    const totalPriceChild = (child: number) => {
        return (child * CHILD_PRICE).toFixed(2);
    };

    const totalPriceOrderList = (orderList: TotalProduct[]) => {
        return orderList
            .reduce((acc, curr) => acc + curr.totalPrice, 0)
            .toFixed(2);
    };

    const totalPriceDiscount = (adult: number, child: number) => {
        return (
            (Number(totalPriceAdult(adult)) + Number(totalPriceChild(child))) *
            0.1
        ).toFixed(2);
    };

    const totalPriceService = (
        adult: number,
        child: number,
        discount: number,
        orderPrice: number
    ) => {
        return (
            Number(adult) +
            Number(child) +
            Number(orderPrice) -
            Number(discount)
        ).toFixed(2);
    };

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
                        <TableSelector
                            key={info.activeInfoId}
                            tables={info}
                            selectedTable={selectedTable}
                            setSelectedTable={setSelectedTable}
                        />
                    ))}
                </div>
            </div>

            {/* Order List */}
            {isLoadingOrderList ? (
                <PageLoader className="h-[200px]" />
            ) : (
                <>
                    <div className="flex flex-col gap-2 mt-4">
                        <TextHeader text="รายการสินค้า" className="text-md" />
                        {orderList && orderList.length > 0 ? (
                            orderList.map((product) => (
                                <TotalProductCard
                                    key={product.productId}
                                    product={product}
                                />
                            ))
                        ) : (
                            <div className="flex items-center justify-center h-[200px]">
                                <p className="text-gray-500">กรุณาเลือกโต๊ะ</p>
                            </div>
                        )}
                    </div>
                </>
            )}

            {/* People Count Selector */}
            <div className="mt-4 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                    <TextHeader text="จำนวนคน" className="text-md" />
                    <div className="flex items-center gap-2">
                        <p className="text-sm text-gray-500">วันเกิด</p>
                        <Switch
                            checked={birthDate}
                            onCheckedChange={setBirthDate}
                        />
                    </div>
                </div>
                <div className="w-full relative">
                    <div className="w-full">
                        <SelectedPeople
                            adult={checkoutInfo?.adultNumber ?? 0}
                            child={checkoutInfo?.childNumber ?? 0}
                            setAdult={setAdult}
                            setChild={setChild}
                        />
                    </div>
                </div>
            </div>

            {/*  Payment */}
            <div className="mt-4 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                    <TextHeader text="ชำระเงิน" className="text-md" />
                    {birthDate && (
                        <p className="text-sm text-amber-500">
                            วันเกิดลดราคา 10%
                        </p>
                    )}
                </div>
                <div className="w-full relative border px-4 py-2 rounded-md">
                    {adult > 0 && (
                        <TextCardInfo
                            text={
                                <>
                                    ผู้ใหญ่{" "}
                                    <span className="text-sm text-gray-500 font-medium">
                                        x {adult}
                                    </span>
                                </>
                            }
                            textClassName="text-md font-medium"
                            valueClassName="text-md font-medium"
                            value={`${totalPriceAdult(adult).toString()} ฿`}
                        />
                    )}
                    {child > 0 && (
                        <TextCardInfo
                            text={
                                <>
                                    เด็ก{" "}
                                    <span className="text-sm text-gray-500 font-medium">
                                        x {child}
                                    </span>
                                </>
                            }
                            textClassName="text-md font-medium"
                            valueClassName="text-md font-medium"
                            value={`${totalPriceChild(child).toString()} ฿`}
                        />
                    )}
                    {birthDate && (
                        <TextCardInfo
                            text="ส่วนลดรวม(10%)"
                            textClassName="text-md font-medium text-amber-500"
                            valueClassName="text-md font-medium text-amber-500"
                            value={`-${totalPriceDiscount(
                                adult,
                                child
                            ).toString()} ฿`}
                        />
                    )}
                    <TextCardInfo
                        text="ค่าเครื่องดื่ม"
                        textClassName="text-md font-medium"
                        valueClassName="text-md font-medium"
                        value={`${totalPriceOrderList(
                            orderList ?? []
                        ).toString()} ฿`}
                    />
                    <SeperateLine className="mt-4 mb-2" />
                    <TextCardInfo
                        text="รวมค่าบริการ"
                        textClassName="text-md font-medium"
                        valueClassName="text-md font-medium"
                        value={`${totalPriceService(
                            Number(totalPriceAdult(adult)),
                            Number(totalPriceChild(child)),
                            Number(totalPriceDiscount(adult, child)),
                            Number(totalPriceOrderList(orderList ?? []))
                        ).toString()} ฿`}
                    />
                </div>
            </div>

            {/* Payment Method */}
            <div className="mt-4 flex flex-col gap-2">
                <TextHeader text="ช่องทางชำระเงิน" className="text-md" />

                <div className="mt-4">
                    <SelectedPaymentMethod
                        placeholder="เลือกช่องทางชำระเงิน"
                        setPaymentMethod={setPaymentMethod}
                    />
                </div>
            </div>

            {/* Action Buttons */}
            <div></div>
        </div>
    );
}

export default CheckoutPage;
