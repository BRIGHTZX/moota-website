import React from "react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

type SelectedPeopleProps = {
    adult: number;
    child: number;
    adultMax: number;
    childMax: number;
    setAdult: (adult: number) => void;
    setChild: (child: number) => void;
    disabled?: boolean;
};

function SelectedPeople({
    adult,
    child,
    adultMax,
    childMax,
    setAdult,
    setChild,
    disabled = false,
}: SelectedPeopleProps) {
    return (
        <div className="flex items-center gap-4">
            <SelectPeople
                amount={adultMax}
                placeholder="จำนวนผู้ใหญ่"
                setValue={setAdult}
                disabled={disabled || adultMax === 0}
                value={adult}
            />
            <SelectPeople
                amount={childMax}
                placeholder="จำนวนเด็ก"
                setValue={setChild}
                disabled={disabled || childMax === 0}
                value={child}
            />
        </div>
    );
}

export default SelectedPeople;

const SelectPeople = ({
    amount,
    placeholder,
    value,
    setValue,
    disabled = false,
}: {
    amount: number;
    placeholder: string;
    value: number;
    setValue: (value: number) => void;
    disabled?: boolean;
}) => {
    const valueString = value > 0 ? value.toString() : "";
    return (
        <Select
            value={valueString}
            onValueChange={(value) => setValue(Number(value))}
            disabled={disabled}
        >
            <SelectTrigger className="w-full bg-white" disabled={disabled}>
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {Array.from({ length: amount }, (_, i) => {
                        const value = (i + 1).toString();
                        return (
                            <SelectItem key={value} value={value}>
                                {i + 1}
                            </SelectItem>
                        );
                    })}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};
