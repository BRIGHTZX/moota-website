"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DateModeType } from "@/features/(owner)/dashboard/types";
import { ChangeEvent } from "react";

type CalendarRangeProps = {
    today: string;
    startDate: string;
    endDate: string;
    setStartDate: (date: string) => void;
    setEndDate: (date: string) => void;
    setMode?: (mode: DateModeType) => void;
};

export function CalendarRange({
    today,
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    setMode,
}: CalendarRangeProps) {
    // Update start date and ensure end date is not earlier
    const handleStartChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setStartDate(value);
        // If new start date is after current end date, adjust end date
        if (value > endDate) {
            setEndDate(value);
        }
        setMode?.("custom");
    };

    // Update end date but prevent it from being earlier than start date
    const handleEndChange = (e: ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;
        if (value < startDate) {
            value = startDate; // enforce constraint
        }
        setEndDate(value);
        setMode?.("custom");
    };

    return (
        <div className="border border-gray-300 shadow-sm p-4  bg-white rounded-lg">
            <div className="flex items-center justify-center gap-2">
                <div className="flex flex-1 flex-col gap-2">
                    <Label htmlFor="start-date">ตั้งแต่</Label>
                    <Input
                        id="start-date"
                        type="date"
                        value={startDate}
                        onChange={handleStartChange}
                        max={endDate}
                        className="text-xs"
                    />
                </div>

                <div className="flex flex-1 flex-col gap-2">
                    <Label htmlFor="end-date">ถึง</Label>
                    <Input
                        id="end-date"
                        type="date"
                        value={endDate}
                        onChange={handleEndChange}
                        min={startDate} // enforce end >= start
                        max={today}
                        className="text-xs"
                    />
                </div>
            </div>
        </div>
    );
}
