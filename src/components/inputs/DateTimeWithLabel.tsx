"use client";

import { format } from "date-fns";
import { ChevronDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import {
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";

type DateTimeWithLabelProps<S> = {
    timeNameInSchema: keyof S & string;
    dateNameInSchema: keyof S & string;
};

export function DateTimeWithLabel<S>({
    timeNameInSchema,
    dateNameInSchema,
}: DateTimeWithLabelProps<S>) {
    const [open, setOpen] = useState<boolean>(false);
    const form = useFormContext();

    return (
        <>
            <div className="col-span-1">
                {/* Date Field */}
                <FormField
                    control={form.control}
                    name={dateNameInSchema}
                    render={({ field }) => (
                        <FormItem className="relative">
                            <FormLabel htmlFor="date-picker" className="px-1">
                                Date
                            </FormLabel>
                            <Popover open={open} onOpenChange={setOpen}>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        id="date-picker"
                                        className="w-full justify-between font-normal"
                                    >
                                        {field.value
                                            ? format(field.value, "dd/MM/yyyy")
                                            : "Select date"}
                                        <ChevronDownIcon />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent
                                    className="w-full overflow-hidden p-0"
                                    align="start"
                                >
                                    <Calendar
                                        mode="single"
                                        selected={field.value}
                                        disabled={(date) =>
                                            date <
                                            new Date(
                                                new Date().setDate(
                                                    new Date().getDate() - 1
                                                )
                                            )
                                        }
                                        onSelect={(date) => {
                                            field.onChange(date);
                                            setOpen(false);
                                        }}
                                        captionLayout="dropdown"
                                        className="w-full"
                                    />
                                </PopoverContent>
                            </Popover>
                            <FormMessage className="absolute text-xs -bottom-5 left-0" />
                        </FormItem>
                    )}
                />
            </div>
            <div className="col-span-1">
                <FormField
                    control={form.control}
                    name={timeNameInSchema}
                    render={({ field }) => (
                        <FormItem className="relative">
                            <FormLabel htmlFor="time-picker" className="px-1">
                                Time
                            </FormLabel>
                            <TimeDropdown
                                value={field.value}
                                onChange={field.onChange}
                            />
                            <FormMessage className="absolute text-xs -bottom-5 left-0" />
                        </FormItem>
                    )}
                />
            </div>

            {/* Time Field */}
        </>
    );
}

type TimeDropdownProps = {
    value: string;
    onChange: (val: string) => void;
};

export function TimeDropdown({ value, onChange }: TimeDropdownProps) {
    const [hour, setHour] = useState("16");
    const [minute, setMinute] = useState("00");
    const normalizeValue = (val?: string) => {
        if (!val) return "16:00";
        if (!val.includes(":")) return "16:00";
        const [h, m] = val.split(":");
        const hh = h.padStart(2, "0") || "16";
        const mm = m.padStart(2, "0") || "00";
        return `${hh}:${mm}`;
    };
    useEffect(() => {
        const normalized = normalizeValue(value);
        const [h, m] = normalized.split(":");
        setHour(h);
        setMinute(m);
    }, [value]);
    const hours = Array.from({ length: 7 }, (_, i) => {
        const hour = i + 16;
        return String(hour).padStart(2, "0");
    });
    const minutes = Array.from({ length: 60 }, (_, i) =>
        String(i).padStart(2, "0")
    );

    const handleChange = (h: string, m: string) => {
        const time = `${h}:${m}`;
        onChange(time);
    };

    return (
        <div className="flex gap-2 w-full">
            {/* Hour Select */}
            <Select
                value={hour}
                onValueChange={(val) => {
                    setHour(val);
                    handleChange(val, minute);
                }}
            >
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="ชั่วโมง" />
                </SelectTrigger>
                <SelectContent>
                    {hours.map((h) => (
                        <SelectItem key={h} value={h}>
                            {h}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            {/* Minute Select */}
            <Select
                value={minute}
                onValueChange={(val) => {
                    setMinute(val);
                    handleChange(hour, val);
                }}
            >
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="นาที" />
                </SelectTrigger>
                <SelectContent>
                    {minutes.map((m) => (
                        <SelectItem key={m} value={m}>
                            {m}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}
