'use client';

import AdminPageWrapper from '@/components/AdminPageWrapper';
import { CalendarRange } from '@/components/inputs/CalendarRange';
import PageLoader from '@/components/PageLoader';
import TextHeader from '@/components/TextHeader';
import { Button } from '@/components/ui/button';
import { useGetTakeAwayHistory } from '@/features/(admin)/take-away/api/use-get-take-away-historys';
import TakeAwayHistoryCard from '@/features/(admin)/take-away/components/TakeAwayHistoryCard';
import { ArrowLeftIcon } from 'lucide-react';
import Link from 'next/link';
import { parseAsString, useQueryState } from 'nuqs';
import { useMemo } from 'react';

function TakeAwayHistoryClient() {
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

    // get take-away history
    const { data: takeAwayHistory, isLoading: isLoadingTakeAwayHistory } =
        useGetTakeAwayHistory({ startDate, endDate });

    console.log(takeAwayHistory);
    return (
        <AdminPageWrapper>
            <div className="flex items-center gap-2">
                <Button asChild variant="outline" size="sm">
                    <Link href="/admin/take-away">
                        <ArrowLeftIcon />
                    </Link>
                </Button>
                <TextHeader text="ประวัติการสั่งซื้อกลับบ้าน" />
            </div>

            <div className="mt-4 w-full">
                <CalendarRange
                    today={today}
                    startDate={startDate}
                    endDate={endDate}
                    setStartDate={setStartDate}
                    setEndDate={setEndDate}
                />
            </div>

            {isLoadingTakeAwayHistory ? (
                <PageLoader />
            ) : Object.entries(takeAwayHistory ?? {}).length === 0 ? (
                <div className="flex items-center justify-center">
                    <p className="text-sm text-gray-500">
                        ไม่มีประวัติการสั่งซื้อ
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {Object.entries(takeAwayHistory ?? {}).map(
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
                                    {records.map(takeAway => (
                                        <TakeAwayHistoryCard
                                            key={takeAway.id}
                                            takeAway={takeAway}
                                        />
                                    ))}
                                </div>
                            </div>
                        )
                    )}
                </div>
            )}
        </AdminPageWrapper>
    );
}

export default TakeAwayHistoryClient;
