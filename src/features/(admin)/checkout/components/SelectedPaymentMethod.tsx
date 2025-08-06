import React from 'react';
import { PaymentMethod } from '../types';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

type SelectedPaymentMethodProps = {
    value: PaymentMethod | null;
    placeholder: string;
    setPaymentMethod: (paymentMethod: PaymentMethod) => void;
    disabled?: boolean;
};

function SelectedPaymentMethod({
    value,
    placeholder,
    setPaymentMethod,
    disabled = false,
}: SelectedPaymentMethodProps) {
    const paymentMethodList: PaymentMethod[] = ['cash', 'promptpay'];
    return (
        <Select value={value || ''} onValueChange={setPaymentMethod}>
            <SelectTrigger className="w-full bg-white" disabled={disabled}>
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {paymentMethodList.map(method => (
                        <SelectItem
                            key={method}
                            value={method}
                            onClick={() => setPaymentMethod(method)}
                        >
                            {method === 'cash' ? 'เงินสด' : 'พร้อมเพย์'}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}

export default SelectedPaymentMethod;
