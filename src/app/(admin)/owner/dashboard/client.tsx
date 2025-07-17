'use client';
import AdminPageWrapper from '@/components/AdminPageWrapper';
import TextHeader from '@/components/TextHeader';
import DateRangeControl from '@/features/(owner)/dashboard/components/DateRangeControl';
import IncomeOutComeSections from '@/features/(owner)/dashboard/components/IncomeOutComeSections';
import TotalCardSection from '@/features/(owner)/dashboard/components/TotalCardSection';
import { parseAsString, useQueryState } from 'nuqs';
import React, { useMemo, useState } from 'react';
import { DateModeType } from '@/features/(owner)/dashboard/types';
import CustomerSection from '@/features/(owner)/dashboard/components/CustomerSection';
import StockSection from '@/features/(owner)/dashboard/components/StockSection';
import TopDrinkSection from '@/features/(owner)/dashboard/components/TopDrinkSeciton';

function DashboardClient() {
    const [mode, setMode] = useState<DateModeType>('day');
    const today = useMemo(() => {
        const d = new Date();
        return d.toISOString().split('T')[0];
    }, []);
    const [startDate, setStartDate] = useQueryState(
        'startDate',
        parseAsString.withDefault(today)
    );

    const [endDate, setEndDate] = useQueryState(
        'endDate',
        parseAsString.withDefault(today)
    );

    return (
        <AdminPageWrapper className="bg-gray-50">
            <div className="flex flex-col gap-4">
                <TextHeader text="รายงานร้านค้า" className="text-center" />

                {/* Date Range Control */}
                <DateRangeControl
                    today={today}
                    startDate={startDate}
                    endDate={endDate}
                    setStartDate={setStartDate}
                    setEndDate={setEndDate}
                    setMode={setMode}
                />

                <TotalCardSection startDate={startDate} endDate={endDate} />

                <IncomeOutComeSections
                    startDate={startDate}
                    endDate={endDate}
                    mode={mode}
                />

                <CustomerSection
                    startDate={startDate}
                    endDate={endDate}
                    mode={mode}
                />

                <StockSection startDate={startDate} endDate={endDate} />

                <TopDrinkSection startDate={startDate} endDate={endDate} />
            </div>
        </AdminPageWrapper>
    );
}

export default DashboardClient;
