import React, { useRef } from "react";
import { useFormContext } from "react-hook-form";
import { FormField, FormItem, FormMessage } from "../ui/form";
import { cn } from "@/lib/utils";
import Image from "next/image";

type ImageInputProps<S> = {
    value?: string | File | null;
    nameInSchema: keyof S & string;
    errorClassName?: string;
    handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function ImageInput<S>({
    nameInSchema,
    value,
    errorClassName,
    handleImageChange,
}: ImageInputProps<S>) {
    const inputRef = useRef<HTMLInputElement>(null);
    const form = useFormContext();

    return (
        <FormField
            control={form.control}
            name={nameInSchema}
            render={() => (
                <FormItem className="relative">
                    {/* Preview Image */}
                    <div
                        onClick={() => inputRef.current?.click()}
                        className="w-full h-40  rounded-lg border border-coffee-dark cursor-pointer overflow-hidden"
                    >
                        <Image
                            src={
                                value instanceof File
                                    ? URL.createObjectURL(value)
                                    : value ?? "/product-default.jpg"
                            }
                            alt="preview"
                            width={1000}
                            height={1000}
                            className="w-full h-full object-cover object-t "
                        />
                    </div>
                    {/* Input File */}
                    <input
                        id={nameInSchema as string}
                        type="file"
                        hidden
                        ref={inputRef}
                        onChange={(e) => handleImageChange(e)}
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

export default ImageInput;
