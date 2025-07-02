import React from "react";
import { Input } from "../ui/input";
import { useFormContext } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { cn } from "@/lib/utils";

type InputWithLabelProps<S> = {
    type?: string;
    fieldTitle: string;
    nameInSchema: keyof S & string;
    placeholder: string;
    labelClassName?: string;
    inputClassName?: string;
    errorClassName?: string;
};

function InputWithLabel<S>({
    type = "text",
    fieldTitle,
    nameInSchema,
    placeholder,
    labelClassName,
    inputClassName,
    errorClassName,
    ...props
}: InputWithLabelProps<S>) {
    const form = useFormContext();
    return (
        <FormField
            control={form.control}
            name={nameInSchema}
            render={({ field }) => (
                <FormItem className="relative">
                    <FormLabel
                        htmlFor={nameInSchema as string}
                        className={labelClassName}
                    >
                        {fieldTitle}
                    </FormLabel>
                    <Input
                        {...field}
                        {...props}
                        id="input"
                        placeholder={placeholder}
                        type={type}
                        className={inputClassName}
                        value={field.value}
                    />
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

export default InputWithLabel;
