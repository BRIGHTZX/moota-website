import React from "react";
import { PaymentMethod } from "../types";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

type SelectedPaymentMethodProps = {
    placeholder: string;
    setPaymentMethod: (paymentMethod: PaymentMethod) => void;
};

function SelectedPaymentMethod({
    placeholder,
    setPaymentMethod,
}: SelectedPaymentMethodProps) {
    const paymentMethodList: PaymentMethod[] = ["cash", "promptpay"];
    return (
        <Select>
            <SelectTrigger className="w-full">
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {paymentMethodList.map((method) => (
                        <SelectItem
                            key={method}
                            value={method}
                            onClick={() => setPaymentMethod(method)}
                        >
                            {method === "cash" ? "สด" : "พร้อมเพย์"}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}

export default SelectedPaymentMethod;
