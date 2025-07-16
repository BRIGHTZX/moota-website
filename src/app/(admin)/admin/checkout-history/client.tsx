'use client';
import AdminPageWrapper from '@/components/AdminPageWrapper';
import { CalendarRange } from '@/components/inputs/CalendarRange';
import PageLoader from '@/components/PageLoader';
import TextHeader from '@/components/TextHeader';
import { Button } from '@/components/ui/button';
import { useGetCheckoutsHistory } from '@/features/(admin)/checkout-history/api/use-get-checkouts-history';
import CheckoutHistoryCard from '@/features/(admin)/checkout-history/components/CheckoutHistoryCard';
import { ArrowLeftIcon } from 'lucide-react';
import Link from 'next/link';
import { parseAsString, useQueryState } from 'nuqs';
import { useMemo } from 'react';

function CheckoutHistoryClient() {
    const { today, sevenDaysAgo } = useMemo(() => {
        const d = new Date();
        const past = new Date();

        past.setDate(past.getDate() - 7);

        return {
            today: d.toISOString().split('T')[0],
            sevenDaysAgo: past.toISOString().split('T')[0],
        };
    }, []);
    const [startDate, setStartDate] = useQueryState(
        'startDate',
        parseAsString.withDefault(sevenDaysAgo)
    );

    const [endDate, setEndDate] = useQueryState(
        'endDate',
        parseAsString.withDefault(today)
    );

    // get checkouts history
    const { data: checkoutsHistory, isLoading: isLoadingCheckoutsHistory } =
        useGetCheckoutsHistory(startDate, endDate);

    const isLoading = isLoadingCheckoutsHistory;

    return (
        <AdminPageWrapper>
            <div className="flex items-center gap-2">
                <Button asChild variant="outline" size="sm">
                    <Link href="/admin/actives">
                        <ArrowLeftIcon />
                    </Link>
                </Button>
                <TextHeader text="ประวัติการชำระเงิน" />
            </div>

            <div className="relative mt-4 w-full">
                <CalendarRange
                    today={today}
                    startDate={startDate}
                    endDate={endDate}
                    setStartDate={setStartDate}
                    setEndDate={setEndDate}
                />
            </div>

            {isLoading ? (
                <PageLoader className="h-[300px]" />
            ) : (
                <div className="mt-4 flex flex-col gap-4">
                    {Object.entries(checkoutsHistory ?? {}).length === 0 ? (
                        <p className="text-center text-lg font-bold text-gray-400">
                            ไม่มีประวัติการชำระเงิน
                        </p>
                    ) : (
                        Object.entries(checkoutsHistory ?? {}).map(
                            ([date, records]) => (
                                <div key={date}>
                                    <p className="text-md mt-4 mb-2 font-bold text-gray-500">
                                        {new Date(date).toLocaleDateString(
                                            'th-TH',
                                            {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                            }
                                        )}
                                    </p>
                                    <div className="flex flex-col gap-2">
                                        {records.map(checkoutHistory => (
                                            <CheckoutHistoryCard
                                                key={checkoutHistory.id}
                                                checkoutHistory={
                                                    checkoutHistory
                                                }
                                            />
                                        ))}
                                    </div>
                                </div>
                            )
                        )
                    )}
                </div>
            )}
        </AdminPageWrapper>
    );
}

export default CheckoutHistoryClient;
