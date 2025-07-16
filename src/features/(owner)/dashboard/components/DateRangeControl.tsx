import { CalendarRange } from '@/components/inputs/CalendarRange';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { subDays, subMonths } from 'date-fns';
import { useState } from 'react';
import { DateModeType } from '../types';

type DateRangeControlProps = {
    today: string;
    startDate: string;
    endDate: string;
    setStartDate: (date: string) => void;
    setEndDate: (date: string) => void;
    setMode: (mode: DateModeType) => void;
};
function DateRangeControl({
    today,
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    setMode,
}: DateRangeControlProps) {
    const [dateType, setDateType] = useState<
        'today' | '7-days' | '1-month' | '3-months'
    >('today');
    const handleToday = () => {
        setDateType('today');
        setStartDate(today);
        setEndDate(today);
        setMode('day');
    };

    const handle7Days = (today: string) => {
        setDateType('7-days');
        const sevenDaysAgo = subDays(new Date(today), 7);
        setStartDate(sevenDaysAgo.toISOString().split('T')[0]);
        setEndDate(today);
        setMode('day');
    };

    const handle1Month = (today: string) => {
        setDateType('1-month');
        const oneMonthAgo = subMonths(new Date(today), 1);
        setStartDate(oneMonthAgo.toISOString().split('T')[0]);
        setEndDate(today);
        setMode('month');
    };

    const handle3Month = (today: string) => {
        setDateType('3-months');
        const threeMonthsAgo = subMonths(new Date(today), 3);
        setStartDate(threeMonthsAgo.toISOString().split('T')[0]);
        setEndDate(today);
        setMode('month');
    };

    return (
        <div>
            <CalendarRange
                today={today}
                startDate={startDate}
                endDate={endDate}
                setStartDate={setStartDate}
                setEndDate={setEndDate}
                setMode={setMode}
            />

            {/* Today Button */}
            <div className="mt-2 flex items-center gap-2">
                <DateTypeButton
                    label="วันนี้"
                    onClick={handleToday}
                    isActive={dateType === 'today'}
                />
                <DateTypeButton
                    label="7 วันที่แล้ว"
                    onClick={() => handle7Days(today)}
                    isActive={dateType === '7-days'}
                />
                <DateTypeButton
                    label="1 เดือนที่แล้ว"
                    onClick={() => handle1Month(today)}
                    isActive={dateType === '1-month'}
                />
                <DateTypeButton
                    label="3 เดือนที่แล้ว"
                    onClick={() => handle3Month(today)}
                    isActive={dateType === '3-months'}
                />
            </div>
        </div>
    );
}

export default DateRangeControl;

type DateTypeButtonProps = {
    label: string;
    onClick: () => void;
    isActive: boolean;
};
const DateTypeButton = ({ label, onClick, isActive }: DateTypeButtonProps) => {
    return (
        <Button
            variant="outline"
            size="sm"
            className={cn('bg-white', isActive && 'bg-blue-500 text-white')}
            onClick={onClick}
        >
            <span className="text-xs">{label}</span>
        </Button>
    );
};
