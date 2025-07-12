"use client";
import AdminPageWrapper from "@/components/AdminPageWrapper";
import PageLoader from "@/components/PageLoader";
import TextHeader from "@/components/TextHeader";
import { useGetTotalCountInfomation } from "@/features/(owner)/dashboard/api/use-get-total-count-infomation";
import DateRangeControl from "@/features/(owner)/dashboard/components/DateRangeControl";
import TotalCardSection from "@/features/(owner)/dashboard/components/TotalCardSection";
import { parseAsString, useQueryState } from "nuqs";
import React, { useMemo } from "react";

function DashboardPage() {
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
        data: totalCountInfomation,
        isLoading: isLoadingTotalCountInfomation,
    } = useGetTotalCountInfomation(startDate, endDate);

    if (isLoadingTotalCountInfomation) {
        return <PageLoader />;
    }

    return (
        <AdminPageWrapper className="bg-gray-50 h-[100dvh]">
            <div className="flex flex-col gap-4">
                <TextHeader text="Overview" />

                {/* Date Range Control */}
                <DateRangeControl
                    today={today}
                    startDate={startDate}
                    endDate={endDate}
                    setStartDate={setStartDate}
                    setEndDate={setEndDate}
                />

                {/* TOTAL CARD SECTION */}
                <TotalCardSection
                    totalCountInfomation={
                        totalCountInfomation ?? {
                            totalAdult: 0,
                            totalChild: 0,
                            totalAmount: 0,
                            totalOrder: 0,
                            totalPreOrder: 0,
                        }
                    }
                />
            </div>
        </AdminPageWrapper>
    );
}

export default DashboardPage;
