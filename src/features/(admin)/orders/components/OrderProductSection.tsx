"use client";
import React, { useState } from "react";
import { useGetProductDrinks } from "../api/use-get-product-drinks";
import OrderProductCard from "./OrderProductCard";
import PageLoader from "@/components/PageLoader";
import { OrderItem } from "../types";
import { Button } from "@/components/ui/button";
import AlertDialogCustom from "@/components/AlertDialogCustom";

function OrderProductSection() {
    const [openAlertDialog, setOpenAlertDialog] = useState<boolean>(false);
    const { data: drinkList, isLoading: isLoadingDrinkList } =
        useGetProductDrinks();

    const [orderList, setOrderList] = useState<OrderItem[]>([]);

    return (
        <div>
            {/* Alert Dialog */}
            <AlertDialogCustom
                open={openAlertDialog}
                setOpen={setOpenAlertDialog}
                action={() => {}}
                cancelAction={() => {}}
                title="ยืนยันการสั่งซื้อ"
                description="คุณต้องการยืนยันการสั่งซื้อหรือไม่"
                buttonActionText="ยืนยัน"
            />
            {/* Drink List */}

            {isLoadingDrinkList ? (
                <PageLoader className="h-[400px]" />
            ) : (
                <div className="flex flex-col gap-2">
                    {drinkList?.map((drink) => (
                        <OrderProductCard
                            key={drink.id}
                            product={drink}
                            orderList={orderList}
                            setOrderList={setOrderList}
                        />
                    ))}
                </div>
            )}
            {/* Order List and Send Data */}
            <div className="flex flex-col gap-2 border border-coffee-dark rounded-md mt-4 p-4">
                <div className="flex items-center justify-between">
                    <p className="text-coffee-dark text-lg font-bold">
                        รายการสั่งซื้อ
                    </p>
                    <p className="text-coffee-dark text-sm font-bold">
                        รวม{" "}
                        {orderList.reduce(
                            (acc, item) => acc + item.quantity,
                            0
                        )}
                    </p>
                </div>

                <div className="flex flex-col gap-2">
                    {orderList.length === 0 && (
                        <div className="flex items-center justify-center h-24">
                            <p className="text-gray-500 text-center text-sm font-bold">
                                ไม่มีรายการสั่งซื้อ
                            </p>
                        </div>
                    )}
                    {orderList.map((item) => (
                        <OrderInfoCard
                            key={item.product.id}
                            productName={item.product.name}
                            price={item.product.price}
                            quantity={item.quantity}
                        />
                    ))}

                    <div className="mt-4">
                        <Button
                            disabled={orderList.length === 0}
                            variant="coffeePrimary"
                            className="w-full"
                            onClick={() => setOpenAlertDialog(true)}
                        >
                            ยืนยันการสั่งซื้อ
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrderProductSection;

type OrderInfoCardProps = {
    productName: string;
    price: number;
    quantity: number;
};

const OrderInfoCard = ({
    productName,
    price,
    quantity,
}: OrderInfoCardProps) => {
    const totalPrice = price * quantity;
    return (
        <div className="flex justify-between items-center">
            <div>
                <p>{productName}</p>
                <div className="flex text-sm text-gray-500 items-center gap-2">
                    <p>{price} ฿</p>
                    <p>x</p>
                    <p>{quantity}</p>
                </div>
            </div>

            <p>{totalPrice} ฿</p>
        </div>
    );
};
