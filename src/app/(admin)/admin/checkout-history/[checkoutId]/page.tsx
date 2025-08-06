'use client';
import AdminPageWrapper from '@/components/AdminPageWrapper';
import ErrorPage from '@/components/errors/ErrorPage';
import PageLoader from '@/components/PageLoader';
import SeperateLine from '@/components/SeperateLine';
import { TextCardInfo } from '@/components/TextCardInfo';
import TextHeader from '@/components/TextHeader';
import { Button } from '@/components/ui/button';
import { useGetCheckoutHistory } from '@/features/(admin)/checkout-history/api/use-get-checkout-history';
import PaymentBadge from '@/features/(admin)/checkout-history/components/PaymentMethodBadge';
import { formattedDateTimeThai } from '@/services/formattedDateTimeThai';
import { ArrowLeftIcon } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { use, useMemo } from 'react';

function CheckoutHistoryDetailPage({
    params,
}: {
    params: Promise<{ checkoutId: string }>;
}) {
    const { checkoutId } = use(params);
    const searchParams = useSearchParams();
    const returnUrl = searchParams.get('returnUrl');
    const {
        data: checkoutHistory,
        isLoading,
        isError,
    } = useGetCheckoutHistory({
        checkoutId,
    });

    const checkoutStatus = checkoutHistory?.active?.status;
    const {
        customerName,
        paidAdultNumber,
        paidChildNumber,
        totalOrderPrice,
        totalDiscount,
        totalAmount,
        checkoutPaymentInfos,
    } = checkoutHistory ?? {};

    const totalAdultPrice = useMemo(() => {
        return checkoutPaymentInfos
            ?.flatMap(round => round.payments)
            .reduce((acc, item) => {
                return item.groupType === 'adult' ? acc + item.totalPrice : acc;
            }, 0);
    }, [checkoutPaymentInfos]);

    const totalChildPrice = useMemo(() => {
        return checkoutPaymentInfos
            ?.flatMap(round => round.payments)
            .reduce((acc, item) => {
                return item.groupType === 'child' ? acc + item.totalPrice : acc;
            }, 0);
    }, [checkoutPaymentInfos]);

    const totalPayment = useMemo(() => {
        return (totalAdultPrice ?? 0) + (totalChildPrice ?? 0);
    }, [totalAdultPrice, totalChildPrice]);

    if (isError) return <ErrorPage />;

    return (
        <AdminPageWrapper>
            {isLoading ? (
                <PageLoader className="h-[calc(100vh-30rem)]" />
            ) : (
                <>
                    <div className="relative">
                        <div className="absolute top-0 left-0">
                            <Button asChild variant="outline" size="sm">
                                <Link
                                    href={
                                        returnUrl ?? '/admin/checkout-history'
                                    }
                                >
                                    <ArrowLeftIcon className="h-4 w-4" />
                                </Link>
                            </Button>
                        </div>
                        <TextHeader
                            text="รายละเอียดการชำระเงิน"
                            className="text-center"
                        />
                    </div>

                    <SeperateLine className="my-4" />

                    {/* Date */}
                    <div className="mt-4 flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                            <p className="text-xs font-semibold">
                                วันที่ชำระเงิน
                            </p>
                            <p className="text-xs font-light text-gray-500">
                                {new Date(
                                    checkoutHistory?.updatedAt ?? ''
                                ).toLocaleString('th-TH', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                })}
                            </p>
                        </div>
                        {/* Checkout Status */}
                        <CheckoutStatusBadge status={checkoutStatus ?? ''} />
                    </div>

                    <div className="mt-4 flex flex-col gap-4">
                        {/* Overview Payment History */}
                        <div className="overfow-hidden relative rounded-md border border-gray-500">
                            <p className="rounded-t-md border-b bg-gray-100 p-2 text-center text-sm font-semibold">
                                ข้อมูลการชำระเงิน
                            </p>

                            <div className="flex flex-col gap-2 p-4">
                                <TextCardInfo
                                    text="ชื่อลูกค้า"
                                    value={customerName}
                                />
                                {paidAdultNumber !== 0 && (
                                    <TextCardInfo
                                        text="จำนวนผู้ใหญ่"
                                        subText={`x ${paidAdultNumber}`}
                                        value={`${totalAdultPrice?.toLocaleString()} บาท`}
                                    />
                                )}
                                {paidChildNumber !== 0 && (
                                    <TextCardInfo
                                        text="จำนวนผู้เด็ก"
                                        subText={`x ${paidChildNumber}`}
                                        value={`${totalChildPrice?.toLocaleString()} บาท`}
                                    />
                                )}
                                <TextCardInfo
                                    text="ราคารวมเครื่องดื่ม"
                                    value={`${totalOrderPrice?.toLocaleString()} บาท`}
                                />
                                {totalDiscount !== 0 && (
                                    <TextCardInfo
                                        text="ส่วนลด"
                                        value={`${totalDiscount?.toLocaleString()} บาท`}
                                    />
                                )}
                                <TextCardInfo
                                    text="ราคารวมทั้งหมด"
                                    value={`${totalAmount?.toLocaleString()} บาท`}
                                />
                            </div>
                        </div>

                        {/* Payment History List */}
                        <div className="relative overflow-hidden rounded-md border border-gray-500">
                            <p className="rounded-t-md border-b bg-gray-100 p-2 text-center text-sm font-semibold">
                                ประวัติการชำระเงิน
                            </p>

                            <div className="flex flex-col gap-2 p-4">
                                {checkoutPaymentInfos?.length === 0 ? (
                                    <div className="flex h-[100px] items-center justify-center">
                                        <p className="text-gray-500">
                                            ไม่มีประวัติการชำระเงิน
                                        </p>
                                    </div>
                                ) : (
                                    checkoutPaymentInfos?.map(
                                        (round, index) => (
                                            <div
                                                key={index}
                                                className="flex flex-col gap-1 rounded-md border p-3"
                                            >
                                                <p className="text-sm font-semibold text-gray-500">
                                                    รอบที่ {index + 1} —{' '}
                                                    {formattedDateTimeThai(
                                                        round.createdAt
                                                    )}
                                                </p>
                                                <div className="flex flex-col gap-2">
                                                    {round.payments.map(
                                                        (item, i) => (
                                                            <TextCardInfo
                                                                key={`${item.groupType}-${i}`}
                                                                text={
                                                                    <div className="flex items-center gap-2">
                                                                        <span className="font-semibold capitalize">
                                                                            {item.groupType ===
                                                                            'adult'
                                                                                ? 'ผู้ใหญ่'
                                                                                : 'เด็ก'}
                                                                        </span>
                                                                        <span className="text-xs font-light text-gray-500">
                                                                            x{' '}
                                                                            {
                                                                                item.quantity
                                                                            }
                                                                        </span>
                                                                        <PaymentBadge
                                                                            paymentMethod={
                                                                                item.paymentMethod
                                                                            }
                                                                        />
                                                                    </div>
                                                                }
                                                                value={`${item.totalPrice.toLocaleString()} บาท`}
                                                            />
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        )
                                    )
                                )}

                                <SeperateLine className="my-2" />

                                <TextCardInfo
                                    text="ราคารวมทั้งหมด"
                                    value={`${totalPayment?.toLocaleString()} บาท`}
                                    valueClassName="font-semibold"
                                />
                            </div>
                        </div>

                        {/* Order History List */}
                        <div className="overfow-hidden relative rounded-md border border-gray-500">
                            <p className="rounded-t-md border-b bg-gray-100 p-2 text-center text-sm font-semibold">
                                รายการเครื่องดื่ม
                            </p>

                            <div className="flex flex-col gap-2 p-4">
                                {checkoutHistory?.checkoutInfos?.length ===
                                0 ? (
                                    <div className="flex h-[100px] items-center justify-center">
                                        <p className="text-gray-500">
                                            ไม่มีรายการเครื่องดื่ม
                                        </p>
                                    </div>
                                ) : (
                                    checkoutHistory?.checkoutInfos?.map(
                                        item => (
                                            <TextCardInfo
                                                key={item.productId}
                                                text={
                                                    <>
                                                        <span className="font-semibold">
                                                            {item.productName}
                                                        </span>
                                                        <span className="ml-2 text-xs font-light text-gray-500">
                                                            x {item.quantity}
                                                        </span>
                                                    </>
                                                }
                                                value={`${item.totalPrice?.toLocaleString()} บาท`}
                                            />
                                        )
                                    )
                                )}

                                <SeperateLine className="my-2" />

                                <TextCardInfo
                                    text="ราคารวมทั้งหมด"
                                    value={`${checkoutHistory?.totalOrderPrice?.toLocaleString()} บาท`}
                                    valueClassName="font-semibold"
                                />
                            </div>
                        </div>
                    </div>
                </>
            )}
        </AdminPageWrapper>
    );
}

export default CheckoutHistoryDetailPage;

const CheckoutStatusBadge = ({ status }: { status: string }) => {
    const statusColor =
        status === 'closed'
            ? 'bg-green-500'
            : status === 'partial'
              ? 'bg-amber-500'
              : 'bg-red-500';

    const statusText =
        status === 'closed'
            ? 'ชำระเงินครบถ้วน'
            : status === 'partial'
              ? 'ชำระเงินบางส่วน'
              : 'ชำระเงินไม่ครบถ้วน';

    return (
        <div className={`text-xs font-semibold ${statusColor} rounded-md p-1`}>
            <p className="text-white">{statusText}</p>
        </div>
    );
};
