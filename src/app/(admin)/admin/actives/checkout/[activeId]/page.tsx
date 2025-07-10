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
    CheckoutStatus,
    PaymentMethod,
    SelectedTable,
} from "@/features/(admin)/checkout/types";
import { Switch } from "@/components/ui/switch";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import SeperateLine from "@/components/SeperateLine";
import SelectedPaymentMethod from "@/features/(admin)/checkout/components/SelectedPaymentMethod";
import AlertDialogCustom from "@/components/AlertDialogCustom";
import { toast } from "sonner";
import { useCreateCheckout } from "@/features/(admin)/checkout/api/use-create-checkout";
import AdminPageWrapper from "@/components/AdminPageWrapper";

function CheckoutPage() {
    const [openAlertDialog, setOpenAlertDialog] = useState<boolean>(false);
    const activeId = useGetActiveId();
    const [adult, setAdult] = useState<number>(0);
    const [child, setChild] = useState<number>(0);
    const [selectedTable, setSelectedTable] = useState<SelectedTable[]>([]);
    const [birthDate, setBirthDate] = useState<boolean>(false);
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(
        null
    );
    // Customer Info and Table Selector
    const { data: checkoutInfo, isLoading: isLoadingCheckoutInfo } =
        useGetCheckoutInfo(activeId);

    const activeInfoIds = useMemo(() => {
        return selectedTable?.map((info) => info.activeInfoId) ?? [];
    }, [selectedTable]);

    const tableIds = useMemo(() => {
        return selectedTable?.map((info) => info.tableId) ?? [];
    }, [selectedTable]);

    // Order List
    const { data: orderList, isLoading: isLoadingOrderList } =
        useGetCheckoutOrderLists(
            selectedTable?.map((info) => info.activeInfoId) ?? []
        );

    // Create Checkout
    const { mutate: createCheckout, isPending: isLoadingCreateCheckout } =
        useCreateCheckout({
            activeId: activeId,
            activeInfoId: activeInfoIds,
        });

    // function calculate
    const ADULT_PRICE = 199;
    const CHILD_PRICE = 129;

    const priceAdult = useMemo(() => adult * ADULT_PRICE, [adult]);

    const priceChild = useMemo(() => child * CHILD_PRICE, [child]);

    const discount = useMemo(() => {
        return birthDate ? (priceAdult + priceChild) * 0.1 : 0;
    }, [priceAdult, priceChild, birthDate]);

    const orderPrice = useMemo(() => {
        return (orderList ?? []).reduce(
            (acc, curr) => acc + curr.totalPrice,
            0
        );
    }, [orderList]);

    const totalPrice = useMemo(() => {
        return priceAdult + priceChild + orderPrice - discount;
    }, [priceAdult, priceChild, orderPrice, discount]);

    // submit checkout
    const isAllTablesSelected = useMemo(() => {
        return (
            checkoutInfo?.activeInfos &&
            selectedTable.length === checkoutInfo?.activeInfos?.length
        );
    }, [selectedTable, checkoutInfo]);

    useEffect(() => {
        if (isAllTablesSelected) {
            setAdult(checkoutInfo?.adultNumber ?? 0);
            setChild(checkoutInfo?.childNumber ?? 0);
        }
    }, [isAllTablesSelected, checkoutInfo]);

    const handleSetActiveStatus = () => {
        if (selectedTable.length === (checkoutInfo?.activeInfos?.length ?? 0)) {
            return "closed";
        } else if (selectedTable.length > 0) {
            return "partial";
        }
        return "partial";
    };

    const validateCheckout = () => {
        if (selectedTable.length === 0) {
            toast.error("กรุณาเลือกโต๊ะ");
            return;
        }
        if (
            checkoutInfo &&
            adult === checkoutInfo.adultNumber &&
            child === checkoutInfo.childNumber
        ) {
            const totalTables = checkoutInfo.activeInfos?.length ?? 0;
            if (selectedTable.length !== totalTables) {
                toast.error(
                    `เมื่อเลือกจำนวนคนครบ ต้องเลือกโต๊ะครบทั้งหมด (${totalTables} โต๊ะ)`
                );
                return;
            }
        }
        if (adult === 0 && child === 0) {
            toast.error("กรุณาเลือกจำนวนคน");
            return;
        }
        if (!paymentMethod) {
            toast.error("กรุณาเลือกช่องทางชำระเงิน");
            return;
        }

        setOpenAlertDialog(true);
    };
    const handleSubmitCheckout = () => {
        if (!checkoutInfo?.customerName || !paymentMethod) {
            toast.error("ข้อมูลไม่ครบถ้วน");
            return;
        }

        const activeStatus = handleSetActiveStatus() as CheckoutStatus;

        const finalValue = {
            activeInfoId: activeInfoIds,
            tableId: tableIds,
            customerName: checkoutInfo.customerName,
            paidAdultNumber: adult,
            paidChildNumber: child,
            totalOrderPrice: orderPrice,
            totalDiscount: discount,
            totalAmount: totalPrice,
            paymentMethod: paymentMethod,
            status: activeStatus,
            orderList: orderList ?? [],
        };
        console.log(finalValue);
        createCheckout({
            param: {
                activeId: activeId,
            },
            json: finalValue,
        });
    };

    const isLoading =
        isLoadingOrderList || isLoadingCheckoutInfo || isLoadingCreateCheckout;

    return (
        <AdminPageWrapper>
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
                        ) : selectedTable.length > 0 ? (
                            <div className="flex items-center justify-center h-[200px]">
                                <p className="text-gray-500">
                                    ไม่มีรายการออเดอร์
                                </p>
                            </div>
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
                            adult={adult}
                            adultMax={checkoutInfo?.adultNumber ?? 0}
                            child={child}
                            childMax={checkoutInfo?.childNumber ?? 0}
                            setAdult={setAdult}
                            setChild={setChild}
                            disabled={isAllTablesSelected}
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
                            value={`${priceAdult.toString()} ฿`}
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
                            value={`${priceChild.toString()} ฿`}
                        />
                    )}
                    {birthDate && (
                        <TextCardInfo
                            text="ส่วนลดรวม(10%)"
                            textClassName="text-md font-medium text-amber-500"
                            valueClassName="text-md font-medium text-amber-500"
                            value={`-${discount.toString()} ฿`}
                        />
                    )}
                    <TextCardInfo
                        text="ค่าเครื่องดื่ม"
                        textClassName="text-md font-medium"
                        valueClassName="text-md font-medium"
                        value={`${orderPrice.toString()} ฿`}
                    />
                    <SeperateLine className="mt-4 mb-2" />
                    <TextCardInfo
                        text="รวมค่าบริการ"
                        textClassName="text-md font-medium"
                        valueClassName="text-md font-medium"
                        value={`${totalPrice.toString()} ฿`}
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
            <div>
                <AlertDialogCustom
                    open={openAlertDialog}
                    setOpen={setOpenAlertDialog}
                    action={() => {
                        handleSubmitCheckout();
                    }}
                    title={"ยืนยันการชำระเงิน"}
                    description={"คุณต้องการยืนยันการชำระเงินหรือไม่?"}
                    buttonActionText={"ยืนยัน"}
                />

                <Button
                    variant="coffeePrimary"
                    className="w-full mt-4"
                    onClick={() => validateCheckout()}
                    disabled={isLoading}
                >
                    ชำระเงิน
                </Button>
            </div>
        </AdminPageWrapper>
    );
}

export default CheckoutPage;
