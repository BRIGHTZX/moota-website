'use client';
import AdminPageWrapper from '@/components/AdminPageWrapper';
import ErrorPage from '@/components/errors/ErrorPage';
import { CalendarRange } from '@/components/inputs/CalendarRange';
import PageLoader from '@/components/PageLoader';
import TextHeader from '@/components/TextHeader';
import { useGetHistory } from '@/features/(admin)/import-export/api/use-get-history';
import HistoryProductCard from '@/features/(admin)/import-export/components/HistoryProductCard';
import { parseAsString, useQueryState } from 'nuqs';
import { useMemo } from 'react';

function StockHistoryClient() {
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

    const {
        data: history,
        isLoading: isLoadingHistory,
        isError: isErrorHistory,
    } = useGetHistory(startDate, endDate);

    if (isErrorHistory) return <ErrorPage />;

    return (
        <AdminPageWrapper>
            <TextHeader text="ประวัติการนำเข้า/ออก" />

            <div className="relative mt-4 w-full">
                <CalendarRange
                    today={today}
                    startDate={startDate}
                    endDate={endDate}
                    setStartDate={setStartDate}
                    setEndDate={setEndDate}
                />
            </div>

            {isLoadingHistory ? (
                <PageLoader className="h-[300px]" />
            ) : (
                <div className="mt-4 flex flex-col gap-2">
                    {Object.entries(history ?? {}).length === 0 ? (
                        <p className="text-center text-lg font-bold text-gray-500">
                            ไม่มีประวัติการนำเข้า/ออก
                        </p>
                    ) : (
                        Object.entries(history ?? {}).map(([date, records]) => (
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
                                    {records.map(record => (
                                        <HistoryProductCard
                                            key={record.id}
                                            record={record}
                                        />
                                    ))}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </AdminPageWrapper>
    );
}

export default StockHistoryClient;
