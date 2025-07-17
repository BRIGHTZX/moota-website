'use client';

import AdminPageWrapper from '@/components/AdminPageWrapper';
import AlertDialogCustom from '@/components/AlertDialogCustom';
import ErrorPage from '@/components/errors/ErrorPage';
import PageLoader from '@/components/PageLoader';
import SeperateLine from '@/components/SeperateLine';
import { TextCardInfo } from '@/components/TextCardInfo';
import TextHeader from '@/components/TextHeader';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { ADULT_PRICE, CHILD_PRICE } from '@/constant';
import { useCreateCheckout } from '@/features/(admin)/checkout/api/use-create-checkout';
import { useGetCheckoutOrderLists } from '@/features/(admin)/checkout/api/use-get-checkout-orderLists';
import { useGetCheckoutInfo } from '@/features/(admin)/checkout/api/use-get-checkoutInfo';
import CheckoutStatusBadge from '@/features/(admin)/checkout/components/CheckoutStatusBadge';
import SelectedPaymentMethod from '@/features/(admin)/checkout/components/SelectedPaymentMethod';
import SelectedPeople from '@/features/(admin)/checkout/components/SelectedPeople';
import TableSelector from '@/features/(admin)/checkout/components/SelectedTable';
import TotalProductCard from '@/features/(admin)/checkout/components/TotalProductCard';
import {
    ActiveInfo,
    AllCheckoutStatusType,
    CheckoutStatusType,
    PaymentMethod,
    SelectedTable,
} from '@/features/(admin)/checkout/types';
import { ArrowLeftIcon, HistoryIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { use, useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';

function CheckoutPage({ params }: { params: Promise<{ activeId: string }> }) {
    const { activeId } = use(params);
    const [openAlertDialog, setOpenAlertDialog] = useState<boolean>(false);
    const [adult, setAdult] = useState<number>(0);
    const [child, setChild] = useState<number>(0);
    const [selectedTable, setSelectedTable] = useState<SelectedTable[]>([]);
    const [birthDate, setBirthDate] = useState<boolean>(false);
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(
        null
    );
    // Customer Info and Table Selector
    const {
        data: checkoutInfo,
        isLoading: isLoadingCheckoutInfo,
        isError: isErrorCheckoutInfo,
    } = useGetCheckoutInfo(activeId);

    const calcualteAdultNumber = useMemo(() => {
        return (
            (checkoutInfo?.adultNumber ?? 0) -
            (checkoutInfo?.checkoutHistory?.paidAdultNumber ?? 0)
        );
    }, [checkoutInfo]);

    const calcualteChildNumber = useMemo(() => {
        return (
            (checkoutInfo?.childNumber ?? 0) -
            (checkoutInfo?.checkoutHistory?.paidChildNumber ?? 0)
        );
    }, [checkoutInfo]);

    const activeInfoIds = useMemo(() => {
        return selectedTable?.map(info => info.activeInfoId) ?? [];
    }, [selectedTable]);

    const tableIds = useMemo(() => {
        return selectedTable?.map(info => info.tableId) ?? [];
    }, [selectedTable]);

    // Order List
    const {
        data: orderList,
        isLoading: isLoadingOrderList,
        isError: isErrorOrderList,
    } = useGetCheckoutOrderLists(
        selectedTable?.map(info => info.activeInfoId) ?? []
    );

    // Create Checkout
    const {
        mutate: createCheckout,
        isPending: isLoadingCreateCheckout,
        isError: isErrorCreateCheckout,
    } = useCreateCheckout({
        activeId: activeId,
        activeInfoId: activeInfoIds,
    });

    // function calculate

    const priceAdult = useMemo(() => adult * ADULT_PRICE, [adult]);

    const priceChild = useMemo(() => child * CHILD_PRICE, [child]);

    const discount = useMemo(() => {
        return birthDate
            ? Number(((priceAdult + priceChild) * 0.1).toFixed(2))
            : 0;
    }, [priceAdult, priceChild, birthDate]);

    const orderPrice = useMemo(() => {
        return (orderList ?? []).reduce(
            (acc, curr) => acc + curr.totalPrice,
            0
        );
    }, [orderList]);

    const totalPrice = useMemo(() => {
        return Number(
            (priceAdult + priceChild + orderPrice - discount).toFixed(2)
        );
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
            setAdult(calcualteAdultNumber);
            setChild(calcualteChildNumber);
        }
    }, [isAllTablesSelected, calcualteAdultNumber, calcualteChildNumber]);

    const handleSetActiveStatus = () => {
        if (selectedTable.length === (checkoutInfo?.activeInfos?.length ?? 0)) {
            return 'closed';
        } else if (selectedTable.length > 0) {
            return 'partial';
        }
        return 'partial';
    };

    const validateCheckout = () => {
        if (
            checkoutInfo &&
            adult === calcualteAdultNumber &&
            child === calcualteChildNumber
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
            toast.error('กรุณาเลือกจำนวนคน');
            return;
        }
        if (!paymentMethod) {
            toast.error('กรุณาเลือกช่องทางชำระเงิน');
            return;
        }

        setOpenAlertDialog(true);
    };
    const handleSubmitCheckout = () => {
        if (!checkoutInfo?.customerName || !paymentMethod) {
            toast.error('ข้อมูลไม่ครบถ้วน');
            return;
        }

        const activeStatus = handleSetActiveStatus() as CheckoutStatusType;

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
        createCheckout(
            {
                param: {
                    activeId: activeId,
                },
                json: finalValue,
            },
            {
                onSuccess: () => {
                    setSelectedTable([]);
                    setAdult(0);
                    setChild(0);
                    setBirthDate(false);
                    setPaymentMethod(null);
                },
            }
        );
    };

    const isLoading =
        isLoadingOrderList || isLoadingCheckoutInfo || isLoadingCreateCheckout;

    const isError =
        isErrorCheckoutInfo || isErrorCreateCheckout || isErrorOrderList;

    if (isError) return <ErrorPage />;

    return (
        <AdminPageWrapper>
            <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                    <Button asChild variant="outline" className="size-8">
                        <Link href="/admin/actives">
                            <ArrowLeftIcon className="h-6 w-6" />
                        </Link>
                    </Button>

                    <TextHeader text={`คิดเงิน`} />
                </div>

                <CheckoutStatusBadge
                    status={checkoutInfo?.status as AllCheckoutStatusType}
                />
            </div>

            {/* Customer Info */}
            <div className="mt-4 flex flex-col gap-2">
                <div className="flex flex-col gap-2 rounded-md border border-gray-300 bg-white p-4 shadow-sm">
                    <TextCardInfo
                        text="ชื่อลูกค้า"
                        value={checkoutInfo?.customerName ?? ''}
                    />
                    <TextCardInfo
                        text="จำนวนผู้ใหญ่"
                        value={
                            <>
                                <span className="mr-1 text-gray-500">
                                    {checkoutInfo?.checkoutHistory?.paidAdultNumber.toString() ??
                                        0}
                                </span>
                                / {checkoutInfo?.adultNumber.toString() ?? 0}
                            </>
                        }
                    />
                    <TextCardInfo
                        text="จำนวนเด็ก"
                        value={
                            <>
                                <span className="mr-1 text-gray-500">
                                    {checkoutInfo?.checkoutHistory?.paidChildNumber.toString() ??
                                        0}
                                </span>
                                / {checkoutInfo?.childNumber.toString() ?? 0}
                            </>
                        }
                    />
                </div>
            </div>

            {/* Table Selector */}
            <div className="mt-4 flex flex-col gap-2">
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
                    <div className="mt-4 flex flex-col gap-2">
                        <TextHeader text="รายการสินค้า" className="text-md" />
                        {orderList && orderList.length > 0 ? (
                            orderList.map(product => (
                                <TotalProductCard
                                    key={product.productId}
                                    product={product}
                                />
                            ))
                        ) : selectedTable.length > 0 ? (
                            <div className="flex h-[200px] items-center justify-center">
                                <p className="text-gray-500">
                                    ไม่มีรายการออเดอร์
                                </p>
                            </div>
                        ) : (
                            <div className="flex h-[200px] items-center justify-center">
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
                            disabled={isLoading}
                            onCheckedChange={setBirthDate}
                        />
                    </div>
                </div>
                <div className="relative w-full">
                    <div className="w-full">
                        <SelectedPeople
                            adult={adult}
                            adultMax={calcualteAdultNumber}
                            child={child}
                            childMax={calcualteChildNumber}
                            setAdult={setAdult}
                            setChild={setChild}
                            disabled={isAllTablesSelected || isLoading}
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
                <div className="relative w-full rounded-md border border-gray-300 bg-white px-4 py-2 shadow-sm">
                    {adult > 0 && (
                        <TextCardInfo
                            text={
                                <>
                                    ผู้ใหญ่{' '}
                                    <span className="text-sm font-medium text-gray-500">
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
                                    เด็ก{' '}
                                    <span className="text-sm font-medium text-gray-500">
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
                        disabled={isLoading}
                        placeholder="เลือกช่องทางชำระเงิน"
                        setPaymentMethod={setPaymentMethod}
                    />
                </div>
            </div>

            {paymentMethod === 'promptpay' && (
                <div className="mt-4 flex justify-center rounded-md">
                    <Image
                        src="/qr-promptpay.jpg"
                        alt="qr-payment"
                        width={300}
                        height={300}
                        className="rounded-md border"
                    />
                </div>
            )}
            {/* Action Buttons */}
            <div>
                <AlertDialogCustom
                    isLoading={isLoading}
                    open={openAlertDialog}
                    setOpen={setOpenAlertDialog}
                    action={() => {
                        handleSubmitCheckout();
                    }}
                    title={'ยืนยันการชำระเงิน'}
                    description={'คุณต้องการยืนยันการชำระเงินหรือไม่?'}
                    buttonActionText={'ยืนยัน'}
                />

                <Button
                    key="checkout-button-submit"
                    type="button"
                    className="mt-4 w-full"
                    onClick={() => validateCheckout()}
                    disabled={isLoading}
                >
                    ชำระเงิน
                </Button>

                {checkoutInfo?.checkoutHistory?.id && (
                    <Button
                        key="checkout-history"
                        asChild
                        type="button"
                        variant="outline"
                        className="mt-4 w-full"
                        disabled={
                            isLoading || !checkoutInfo?.checkoutHistory?.id
                        }
                    >
                        <Link
                            href={`/admin/checkout-history/${checkoutInfo?.checkoutHistory?.id}?returnUrl=${window.location.pathname}`}
                        >
                            <HistoryIcon />
                            ประวัติการชำระเงิน
                        </Link>
                    </Button>
                )}
            </div>
        </AdminPageWrapper>
    );
}

export default CheckoutPage;
