import React from "react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

type SelectedPeopleProps = {
    adult: number;
    child: number;
    setAdult: (adult: number) => void;
    setChild: (child: number) => void;
};

function SelectedPeople({
    adult,
    child,
    setAdult,
    setChild,
}: SelectedPeopleProps) {
    return (
        <div className="flex items-center gap-4">
            <SelectPeople
                amount={adult}
                placeholder="จำนวนผู้ใหญ่"
                setValue={setAdult}
            />
            <SelectPeople
                amount={child}
                placeholder="จำนวนเด็ก"
                setValue={setChild}
            />
        </div>
    );
}

export default SelectedPeople;

const SelectPeople = ({
    amount,
    placeholder,
    setValue,
}: {
    amount: number;
    placeholder: string;
    setValue: (value: number) => void;
}) => {
    return (
        <Select>
            <SelectTrigger className="w-full">
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel></SelectLabel>
                    {Array.from({ length: amount }, (_, i) => (
                        <SelectItem
                            key={i}
                            value={i.toString()}
                            onClick={() => setValue(i + 1)}
                        >
                            {i + 1}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};
