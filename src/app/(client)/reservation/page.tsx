"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useForm } from "react-hook-form";

import {
    insertPreOrderSchema,
    type insertPreOrderSchemaType,
} from "@/features/(client)/reservation/schema";

import { DateTimeWithLabel } from "@/components/inputs/DateTimeWithLabel";
import InputWithLabel from "@/components/inputs/InputWithLabel";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useCreateReservation } from "@/features/(client)/reservation/api/use-create-reservation";
import TableReservation from "@/features/(client)/reservation/components/TableReservation";
import { useState } from "react";
import { toast } from "sonner";
import AlertDialogCustom from "@/components/AlertDialogCustom";

function ReservationPage() {
    const [openAlertDialog, setOpenAlertDialog] = useState(false);
    const [arrayTable, setArrayTable] = useState<string[]>([]);
    const {
        mutate: createReservation,
        isPending: isCreateReservationPending,
        isError: isCreateReservationError,
    } = useCreateReservation();
    const form = useForm<insertPreOrderSchemaType>({
        mode: "onChange",
        resolver: zodResolver(insertPreOrderSchema),
        defaultValues: {
            customerName: "",
            phoneNumber: "",
            adultNumber: undefined,
            childNumber: undefined,
            reservationDate: new Date().toISOString(),
            reservationTime: "16:00",
        },
    });

    const handleSubmit = (data: insertPreOrderSchemaType) => {
        const finalValue = {
            ...data,
            childNumber: data.childNumber ?? 0,
            tableId: arrayTable,
        };

        createReservation({
            json: finalValue,
        });
    };

    if (isCreateReservationError) {
        toast.error("กรุณากรอกข้อมูลให้ครบถ้วน", {
            style: {
                background: "red",
                color: "white",
            },
        });
        return <p className="text-red-500 pt-30">error</p>;
    }

    return (
        <div className="min-h-screen w-full px-4 md:px-0">
            <AlertDialogCustom
                open={openAlertDialog}
                setOpen={setOpenAlertDialog}
                action={() => {
                    handleSubmit(form.getValues());
                }}
                title="ยืนยันการจอง"
                description="คุณต้องการจองหรือไม่ ข้อมูลที่คุณกรอกจะถูกบันทึกไว้"
                buttonActionText="ตกลง"
            />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)}>
                    <div className="container mx-auto pt-30">
                        <div className="flex items-center justify-between">
                            <h1 className="text-5xl">Reservation</h1>
                            <div className="flex items-center gap-4">
                                <Button
                                    variant="coffeePrimary"
                                    className="w-full hidden md:flex"
                                    type="button"
                                    disabled={isCreateReservationPending}
                                    onClick={async () => {
                                        const result = await form.trigger();

                                        if (!result) {
                                            toast.error(
                                                "กรุณากรอกข้อมูลให้ครบถ้วน",
                                                {
                                                    style: {
                                                        background: "red",
                                                        color: "white",
                                                    },
                                                }
                                            );
                                            return;
                                        } else {
                                            if (arrayTable.length === 0) {
                                                toast.error(
                                                    "กรุณาเลือกโต๊ะที่ต้องการจอง",
                                                    {
                                                        style: {
                                                            background: "red",
                                                            color: "white",
                                                        },
                                                    }
                                                );
                                                return;
                                            }
                                            setOpenAlertDialog(true);
                                        }
                                    }}
                                >
                                    <p className="text-lg font-bold">
                                        จองตาราง
                                    </p>
                                </Button>
                            </div>
                        </div>
                        <div className="mt-10 rounded-lg border-2 border-gray-300 px-4 py-6">
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                                <DateTimeWithLabel<insertPreOrderSchemaType>
                                    timeNameInSchema="reservationTime"
                                    dateNameInSchema="reservationDate"
                                />
                                <div className="col-span-1">
                                    <InputWithLabel
                                        fieldTitle="ผู้ใหญ่"
                                        nameInSchema="adultNumber"
                                        placeholder="กรุณากรอกจำนวนผู้ใหญ่"
                                        type="number"
                                        errorClassName="right-0"
                                    />
                                </div>
                                <div className="col-span-1">
                                    <InputWithLabel
                                        fieldTitle="เด็ก"
                                        nameInSchema="childNumber"
                                        placeholder="กรุณากรอกจำนวนเด็ก"
                                        type="number"
                                        errorClassName="right-0"
                                    />
                                </div>
                                <div className="col-span-1">
                                    <InputWithLabel
                                        fieldTitle="ชื่อผู้จอง"
                                        nameInSchema="customerName"
                                        placeholder="กรุณากรอกชื่อผู้จอง"
                                        type="text"
                                        inputClassName="w-full"
                                        errorClassName="right-0"
                                    />
                                </div>
                                <div className="col-span-1">
                                    <InputWithLabel
                                        fieldTitle="เบอร์โทรศัพท์"
                                        nameInSchema="phoneNumber"
                                        placeholder="กรุณากรอกเบอร์โทรศัพท์"
                                        type="number"
                                        errorClassName="right-0"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="mt-10 border-t border-gray-300" />
                        <TableReservation
                            arrayTable={arrayTable}
                            setArrayTable={setArrayTable}
                        />

                        <div className="flex items-center gap-4">
                            <Button
                                variant="coffeePrimary"
                                className="w-full flex mt-8 md:mt-0 md:hidden"
                                type="button"
                                disabled={isCreateReservationPending}
                                onClick={async () => {
                                    const result = await form.trigger();

                                    if (!result) {
                                        toast.error(
                                            "กรุณากรอกข้อมูลให้ครบถ้วน",
                                            {
                                                style: {
                                                    background: "red",
                                                    color: "white",
                                                },
                                            }
                                        );
                                        return;
                                    } else {
                                        if (arrayTable.length === 0) {
                                            toast.error(
                                                "กรุณาเลือกโต๊ะที่ต้องการจอง",
                                                {
                                                    style: {
                                                        background: "red",
                                                        color: "white",
                                                    },
                                                }
                                            );
                                            return;
                                        }
                                        setOpenAlertDialog(true);
                                    }
                                }}
                            >
                                <p className="text-lg font-bold">จองตาราง</p>
                            </Button>
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
