import React from "react";
import { useFormContext } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import { cn } from "@/lib/utils";

type InputWithLabelProps<S> = {
    fieldTitle: string;
    nameInSchema: keyof S & string;
    placeholder: string;
    labelClassName?: string;
    inputClassName?: string;
    options: string[];
    errorClassName?: string;
    disabled?: boolean;
};

function SelectWithLabel<S>({
    fieldTitle,
    nameInSchema,
    placeholder,
    labelClassName,
    inputClassName,
    options,
    errorClassName,
    disabled,
}: InputWithLabelProps<S>) {
    const form = useFormContext();
    return (
        <FormField
            control={form.control}
            name={nameInSchema}
            render={({ field }) => (
                <FormItem className="relative w-full">
                    <FormLabel
                        htmlFor={nameInSchema}
                        className={labelClassName}
                    >
                        {fieldTitle}
                    </FormLabel>
                    <Select
                        value={field.value === "" ? undefined : field.value}
                        onValueChange={(value) => {
                            if (value === "") {
                                return;
                            }
                            field.onChange(value);
                        }}
                        disabled={disabled}
                    >
                        <SelectTrigger className={cn(inputClassName, "w-full")}>
                            <SelectValue placeholder={placeholder} />
                        </SelectTrigger>
                        <SelectContent>
                            {options.map((option) => (
                                <SelectItem key={option} value={option}>
                                    {option}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <FormMessage
                        className={cn(
                            "absolute text-xs -bottom-5",
                            errorClassName || "left-0"
                        )}
                    />
                </FormItem>
            )}
        />
    );
}

export default SelectWithLabel;
