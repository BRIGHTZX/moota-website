import React from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

type InputWithLabelProps = {
    label: string;
    placeholder: string;
    type: string;
    labelClassName?: string;
    inputClassName?: string;
};

function InputWithLabel({
    label,
    placeholder,
    type = "text",
    labelClassName,
    inputClassName,
}: InputWithLabelProps) {
    return (
        <div className="flex w-full flex-col gap-2">
            <Label htmlFor="input" className={labelClassName}>
                {label}
            </Label>
            <Input
                id="input"
                placeholder={placeholder}
                type={type}
                className={inputClassName}
            />
        </div>
    );
}

export default InputWithLabel;
