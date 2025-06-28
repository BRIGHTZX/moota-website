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

type InputWithLabelProps<S> = {
    fieldTitle: string;
    nameInSchema: keyof S & string;
    placeholder: string;
    labelClassName?: string;
    inputClassName?: string;
    tableType: "inside" | "outside";
};

function SelectWithLabel<S>({
    fieldTitle,
    nameInSchema,
    placeholder,
    labelClassName,
    inputClassName,
    tableType,
}: InputWithLabelProps<S>) {
    const options = [
        { label: "outside-1", tableType: "outside", value: "1" },
        { label: "outside-2", tableType: "outside", value: "2" },
        { label: "outside-3", tableType: "outside", value: "3" },
        { label: "outside-4", tableType: "outside", value: "4" },
        { label: "outside-5", tableType: "outside", value: "5" },
        { label: "outside-6", tableType: "outside", value: "6" },
        { label: "outside-7", tableType: "outside", value: "7" },
        { label: "outside-8", tableType: "outside", value: "8" },
        { label: "outside-9", tableType: "outside", value: "9" },
        { label: "outside-10", tableType: "outside", value: "10" },
        { label: "outside-11", tableType: "outside", value: "11" },
        { label: "outside-12", tableType: "outside", value: "12" },
        { label: "outside-13", tableType: "outside", value: "13" },
        { label: "outside-14", tableType: "outside", value: "14" },
        { label: "outside-15", tableType: "outside", value: "15" },
        { label: "outside-16", tableType: "outside", value: "16" },
        { label: "outside-17", tableType: "outside", value: "17" },
        { label: "outside-18", tableType: "outside", value: "18" },
        { label: "outside-19", tableType: "outside", value: "19" },
        { label: "outside-20", tableType: "outside", value: "20" },
        { label: "inside-1/1", tableType: "inside", value: "1/1" },
        { label: "inside-1/2", tableType: "inside", value: "1/2" },
        { label: "inside-1/3", tableType: "inside", value: "1/3" },
        { label: "inside-1/4", tableType: "inside", value: "1/4" },
        { label: "inside-1/5", tableType: "inside", value: "1/5" },
        { label: "inside-1/6", tableType: "inside", value: "1/6" },
        { label: "inside-2/1", tableType: "inside", value: "2/1" },
        { label: "inside-2/2", tableType: "inside", value: "2/2" },
        { label: "inside-2/3", tableType: "inside", value: "2/3" },
        { label: "inside-2/4", tableType: "inside", value: "2/4" },
        { label: "inside-2/5", tableType: "inside", value: "2/5" },
        { label: "inside-2/6", tableType: "inside", value: "2/6" },
        { label: "inside-3/1", tableType: "inside", value: "3/1" },
        { label: "inside-3/2", tableType: "inside", value: "3/2" },
        { label: "inside-3/3", tableType: "inside", value: "3/3" },
        { label: "inside-3/4", tableType: "inside", value: "3/4" },
        { label: "inside-3/5", tableType: "inside", value: "3/5" },
        { label: "inside-4/1", tableType: "inside", value: "4/1" },
        { label: "inside-4/2", tableType: "inside", value: "4/2" },
        { label: "inside-4/3", tableType: "inside", value: "4/3" },
        { label: "inside-4/4", tableType: "inside", value: "4/4" },
        { label: "inside-4/5", tableType: "inside", value: "4/5" },
        { label: "inside-4/6", tableType: "inside", value: "4/6" },
        { label: "inside-5/1", tableType: "inside", value: "5/1" },
        { label: "inside-5/2", tableType: "inside", value: "5/2" },
        { label: "inside-5/3", tableType: "inside", value: "5/3" },
        { label: "inside-5/4", tableType: "inside", value: "5/4" },
        { label: "inside-5/5", tableType: "inside", value: "5/5" },
    ];
    const form = useFormContext();
    return (
        <FormField
            control={form.control}
            name={nameInSchema}
            render={({ field }) => (
                <FormItem className="relative">
                    <FormLabel
                        htmlFor={nameInSchema}
                        className={labelClassName}
                    >
                        {fieldTitle}
                    </FormLabel>
                    <Select
                        value={field.value === "" ? undefined : field.value}
                        onValueChange={field.onChange}
                    >
                        <SelectTrigger className={inputClassName}>
                            <SelectValue placeholder={placeholder} />
                        </SelectTrigger>
                        <SelectContent>
                            {options
                                .filter(
                                    (option) => option.tableType === tableType
                                )
                                .map((option) => (
                                    <SelectItem
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </SelectItem>
                                ))}
                        </SelectContent>
                    </Select>
                    <FormMessage className="absolute text-xs -bottom-5 left-0" />
                </FormItem>
            )}
        />
    );
}

export default SelectWithLabel;
