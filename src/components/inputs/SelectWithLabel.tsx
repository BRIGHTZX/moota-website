import React from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import { Label } from "../ui/label";

type SelectWithLabelProps = {
    label: string;
    options: string[];
};

function SelectWithLabel({ label, options }: SelectWithLabelProps) {
    return (
        <div className="flex flex-col gap-2">
            <Label htmlFor="select">{label}</Label>
            <Select>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="กรุณาเลือกโต๊ะที่ท่านต้องการจอง" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                </SelectContent>
            </Select>{" "}
        </div>
    );
}

export default SelectWithLabel;
