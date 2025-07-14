"use client";
import AdminPageWrapper from "@/components/AdminPageWrapper";
import { CalendarRange } from "@/components/inputs/CalendarRange";
import PageLoader from "@/components/PageLoader";
import TextHeader from "@/components/TextHeader";
import { useGetHistory } from "@/features/(admin)/import-export/api/use-get-history";
import HistoryProductCard from "@/features/(admin)/import-export/components/HistoryProductCard";
import { parseAsString, useQueryState } from "nuqs";
import { useMemo } from "react";

function StockHistoryClient() {
    const { today, sevenDaysAgo } = useMemo(() => {
        const d = new Date();
        const past = new Date();

        past.setDate(past.getDate() - 7);

        return {
            today: d.toISOString().split("T")[0],
            sevenDaysAgo: past.toISOString().split("T")[0],
        };
    }, []);
    const [startDate, setStartDate] = useQueryState(
        "startDate",
        parseAsString.withDefault(sevenDaysAgo)
    );

    const [endDate, setEndDate] = useQueryState(
        "endDate",
        parseAsString.withDefault(today)
    );

    const {
        data: history,
        isLoading: isLoadingHistory,
        isError: isErrorHistory,
    } = useGetHistory(startDate, endDate);

    if (isErrorHistory) {
        return <div>Error</div>;
    }

    return (
        <AdminPageWrapper>
            <TextHeader text="ประวัติการนำเข้า/ออก" />

            <div className="w-full mt-4 relative">
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
                <div className="flex flex-col mt-4 gap-2">
                    {Object.entries(history ?? {}).length === 0 ? (
                        <p className="text-gray-500 text-lg font-bold text-center">
                            ไม่มีประวัติการนำเข้า/ออก
                        </p>
                    ) : (
                        Object.entries(history ?? {}).map(([date, records]) => (
                            <div key={date}>
                                <p className="mt-4 mb-2 text-gray-500 text-md font-bold">
                                    {new Date(date).toLocaleDateString(
                                        "th-TH",
                                        {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        }
                                    )}
                                </p>

                                <div className="flex flex-col gap-2">
                                    {records.map((record) => (
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
