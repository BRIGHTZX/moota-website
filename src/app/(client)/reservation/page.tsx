"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";

import {
    insertPreOrderSchema,
    type insertPreOrderSchemaType,
} from "@/features/(client)/reservation/schema";

import { DateTimeWithLabel } from "@/components/inputs/DateTimeWithLabel";
import InputWithLabel from "@/components/inputs/InputWithLabel";
import SelectWithLabel from "@/components/inputs/SelectWithLabel";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

function ReservationPage() {
    const [selected, setSelected] = useState<"inside" | "outside">("outside");
    const form = useForm<insertPreOrderSchemaType>({
        resolver: zodResolver(insertPreOrderSchema),
        defaultValues: {
            customerName: "",
            phoneNumber: "",
            email: "",
            tableNumber: "",
            tableType: "outside",
            adultNumber: 0,
            childNumber: 0,
            totalPrice: 50,
            status: "pending",
            reservationDate: new Date(),
            reservationTime: "00:00",
        },
    });

    const handleSelectTableType = (type: "inside" | "outside") => {
        setSelected(type);
        form.setValue("tableType", type);
        form.setValue("tableNumber", "");
    };

    console.log(form.formState.errors);

    const handleSubmit = (data: insertPreOrderSchemaType) => {
        if (data.reservationTime === "00:00") {
            form.setError("reservationTime", {
                message: "กรุณากรอกเวลาจอง",
            });
            return;
        }

        if (data.adultNumber === 0 && data.childNumber === 0) {
            form.setError("adultNumber", {
                message: "กรุณากรอกจำนวน",
            });
            form.setError("childNumber", {
                message: "กรุณากรอกจำนวน",
            });
            return;
        }
    };

    return (
        <div className="min-h-screen w-screen">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)}>
                    <div className="container mx-auto pt-30">
                        <div className="flex items-center justify-between">
                            <h1 className="text-5xl">Reservation</h1>
                            <div className="flex items-center gap-4">
                                <Button
                                    variant="coffeePrimary"
                                    className="w-full"
                                    type="submit"
                                >
                                    <h1 className="text-lg font-bold">
                                        SUBMIT
                                    </h1>
                                </Button>
                            </div>
                        </div>

                        <div className="mt-10 flex items-center">
                            <Button
                                onClick={() => handleSelectTableType("outside")}
                                variant={
                                    selected === "outside"
                                        ? "coffeePrimary"
                                        : "coffeeOutline"
                                }
                                className="w-40 rounded rounded-l-full"
                                type="button"
                            >
                                <h1 className="text-2xl font-bold">Outside</h1>
                            </Button>
                            <Button
                                onClick={() => handleSelectTableType("inside")}
                                variant={
                                    selected === "inside"
                                        ? "coffeePrimary"
                                        : "coffeeOutline"
                                }
                                className="w-40 rounded rounded-r-full"
                                type="button"
                            >
                                <h1 className="text-2xl font-bold">Inside</h1>
                            </Button>
                        </div>

                        <div className="mt-10 rounded-lg border-2 border-gray-300 px-4 py-6">
                            <div className="grid grid-cols-3 gap-4">
                                <div className="col-span-1 flex flex-col gap-4">
                                    <DateTimeWithLabel<insertPreOrderSchemaType>
                                        timeNameInSchema="reservationTime"
                                        dateNameInSchema="reservationDate"
                                    />
                                    <div className="mt-4">
                                        <InputWithLabel
                                            fieldTitle="ชื่อผู้จอง"
                                            nameInSchema="customerName"
                                            placeholder="กรุณากรอกชื่อผู้จอง"
                                            type="text"
                                            inputClassName="w-full"
                                        />
                                    </div>
                                </div>
                                <div className="col-span-1 flex flex-col gap-4">
                                    <SelectWithLabel<insertPreOrderSchemaType>
                                        fieldTitle="โต๊ะที่"
                                        nameInSchema="tableNumber"
                                        placeholder="กรุณาเลือกโต๊ะที่"
                                        inputClassName="w-full"
                                        tableType={selected}
                                    />

                                    <div className="mt-4">
                                        <InputWithLabel
                                            fieldTitle="เบอร์โทรศัพท์"
                                            nameInSchema="phoneNumber"
                                            placeholder="กรุณากรอกเบอร์โทรศัพท์"
                                            type="number"
                                        />
                                    </div>
                                </div>
                                <div className="col-span-1 flex flex-col gap-4">
                                    <div className="flex items-center gap-2">
                                        <InputWithLabel
                                            fieldTitle="ผู้ใหญ่"
                                            nameInSchema="adultNumber"
                                            placeholder="กรุณากรอกจำนวนผู้ใหญ่"
                                            type="number"
                                        />

                                        <InputWithLabel
                                            fieldTitle="เด็ก"
                                            nameInSchema="childNumber"
                                            placeholder="กรุณากรอกจำนวนเด็ก"
                                            type="number"
                                        />
                                    </div>

                                    <div className="mt-4">
                                        <InputWithLabel
                                            fieldTitle="อีเมล"
                                            nameInSchema="email"
                                            placeholder="กรุณากรอกอีเมล (ถ้ามี)"
                                            type="email"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-10 border-t border-gray-300" />

                        <div className="mt-10">
                            <div className="relative z-30 mx-auto mt-10 w-[90%] rounded-lg bg-white p-4">
                                <Image
                                    src="/zone-table.jpeg"
                                    alt="zone-table"
                                    width={1000}
                                    height={1000}
                                    className="h-full w-full object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </form>
            </Form>
        </div>
    );
}

export default ReservationPage;
