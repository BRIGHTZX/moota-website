import InputWithLabel from '@/components/inputs/InputWithLabel';
import SelectWithLabel from '@/components/inputs/SelectWithLabel';
import TextHeader from '@/components/TextHeader';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { FormProvider, useForm } from 'react-hook-form';
import { insertTakeAwaySchema, InsertTakeAwaySchemaType } from '../schemas';

function TakeAwayForm() {
    const form = useForm<InsertTakeAwaySchemaType>({
        resolver: zodResolver(insertTakeAwaySchema),
        defaultValues: {
            totalPrice: 0,
            paymentMethod: undefined,
        },
    });

    const paymentMethod = form.watch('paymentMethod');

    const onSubmit = (data: InsertTakeAwaySchemaType) => {
        console.log(data);
    };

    return (
        <div className="w-full rounded-md border border-gray-300 p-4 shadow-sm">
            <FormProvider {...form}>
                <form
                    className="space-y-6"
                    onSubmit={form.handleSubmit(onSubmit)}
                >
                    <TextHeader
                        text="ราคาที่สั่งซื้อ"
                        className="text-center text-xl font-semibold"
                    />
                    <InputWithLabel<InsertTakeAwaySchemaType>
                        nameInSchema="totalPrice"
                        type="number"
                        placeholder="กรุณากรอกราคา"
                        fieldTitle="ราคารวม"
                        inputClassName="text-sm"
                        labelClassName="text-sm"
                        errorClassName="right-0"
                    />

                    <SelectWithLabel
                        nameInSchema="paymentMethod"
                        fieldTitle="ช่องทางชำระเงิน"
                        placeholder="เลือกช่องทางชำระเงิน"
                        options={[
                            { label: 'เงินสด', value: 'cash' },
                            { label: 'พร้อมเพย์', value: 'promptpay' },
                        ]}
                        errorClassName="right-0"
                    />

                    {paymentMethod === 'promptpay' && (
                        <div className="mt-4 flex justify-center rounded-md">
                            <Image
                                src="/qr-promptpay.jpg"
                                alt="qr-payment"
                                width={300}
                                height={300}
                                className="rounded-md border"
                            />
                        </div>
                    )}

                    <Button className="mt-4 w-full">ชำระเงิน</Button>
                </form>
            </FormProvider>
        </div>
    );
}

export default TakeAwayForm;
