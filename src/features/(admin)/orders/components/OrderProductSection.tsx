"use client";
import React, { useMemo, useState } from "react";
import { useGetProductDrinks } from "../api/use-get-product-drinks";
import OrderProductCard from "./OrderProductCard";
import PageLoader from "@/components/PageLoader";
import { OrderItem } from "../types";
import { Button } from "@/components/ui/button";
import AlertDialogCustom from "@/components/AlertDialogCustom";
import { useCreateOrder } from "../api/use-create-order";
import SeperateLine from "@/components/SeperateLine";
import { useGetOrderHistoryActiveInfoId } from "../api/use-get-order-history-activeInfoId";
import TextHeader from "@/components/TextHeader";
import OrderHistoryCard from "./OrderHistoryCard";

function OrderProductSection({ activeInfoId }: { activeInfoId: string }) {
    const [openAlertDialog, setOpenAlertDialog] = useState<boolean>(false);
    const [orderList, setOrderList] = useState<OrderItem[]>([]);
    const totalPrice = useMemo(
        () =>
            orderList.reduce(
                (acc, item) => acc + item.product.price * item.quantity,
                0
            ),
        [orderList]
    );

    // Get Product Drinks
    const {
        data: drinkList,
        isLoading: isLoadingDrinkList,
        isError: isErrorDrinkList,
    } = useGetProductDrinks();
    // Create Order
    const {
        mutate: createOrder,
        isPending: isPendingCreateOrder,
        isError: isErrorCreateOrder,
    } = useCreateOrder({
        activeInfoId,
        setOrderList,
    });

    // Get Order History
    const {
        data: orderHistory,
        isLoading: isLoadingOrderHistory,
        isError: isErrorOrderHistory,
    } = useGetOrderHistoryActiveInfoId(activeInfoId);

    const handleCreateOrder = () => {
        createOrder({
            json: {
                activeInfoId,
                totalPrice,
                orderList: orderList,
            },
        });
    };

    if (isErrorDrinkList || isErrorCreateOrder || isErrorOrderHistory) {
        return <div>Error</div>;
    }

    return (
        <div>
            {/* Alert Dialog */}
            <AlertDialogCustom
                open={openAlertDialog}
                setOpen={setOpenAlertDialog}
                action={handleCreateOrder}
                cancelAction={() => setOpenAlertDialog(false)}
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

                    <SeperateLine className="my-2" />
                    <div className="flex justify-between items-center">
                        <p className="text-black font-bold">รวมราคา</p>
                        <p className="text-black font-bold">{totalPrice}฿</p>
                    </div>

                    <div className="mt-4">
                        <Button
                            disabled={
                                orderList.length === 0 || isPendingCreateOrder
                            }
                            variant="coffeePrimary"
                            className="w-full"
                            onClick={() => setOpenAlertDialog(true)}
                        >
                            ยืนยันการสั่งซื้อ
                        </Button>
                    </div>
                </div>
            </div>

            {/* Order History */}
            <div className="mt-4">
                <TextHeader text="ประวัติการสั่งซื้อ" className="text-xl" />
                <div className="flex flex-col gap-2">
                    {orderHistory?.map((item) => (
                        <OrderHistoryCard key={item.id} order={item} />
                    ))}
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
