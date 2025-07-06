"use client";
import { CalendarRange } from "@/components/inputs/CalendarRange";
import PageLoader from "@/components/PageLoader";
import SeperateLine from "@/components/SeperateLine";
import TextHeader from "@/components/TextHeader";
import { useGetHistory } from "@/features/(admin)/import-export/api/use-get-history";
import HistoryProductCard from "@/features/(admin)/import-export/components/HistoryProductCard";
import { parseAsString, useQueryState } from "nuqs";
import { useMemo } from "react";

function StockHistoryPage() {
    const today = useMemo(() => {
        const d = new Date();
        return d.toISOString().split("T")[0];
    }, []);
    const [startDate, setStartDate] = useQueryState(
        "startDate",
        parseAsString.withDefault(today)
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
        <div className="p-4 pt-20 relative h-[calc(100vh-5rem)] w-full overflow-y-auto">
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
        </div>
    );
}

export default StockHistoryPage;
