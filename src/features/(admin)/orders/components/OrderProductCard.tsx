import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import { OrderItem, ProductDrink } from "../types";

interface Props {
    product: ProductDrink;
    orderList?: OrderItem[];
    setOrderList: (
        list: OrderItem[] | ((prev: OrderItem[]) => OrderItem[])
    ) => void;
}

function OrderProductCard({ product, orderList = [], setOrderList }: Props) {
    const initialQty =
        orderList.find((i) => i.product.id === product.id)?.quantity ?? 0;
    const [quantity, setQuantity] = useState<number>(initialQty);

    const syncOrderList = useCallback(
        (nextQty: number) => {
            setOrderList((prev) => {
                const idx = prev.findIndex((i) => i.product.id === product.id);
                if (nextQty === 0) {
                    return idx === -1 ? prev : prev.filter((_, i) => i !== idx);
                }
                if (idx === -1) {
                    return [...prev, { product, quantity: nextQty }];
                }
                const next = [...prev];
                next[idx] = { ...next[idx], quantity: nextQty };
                return next;
            });
        },
        [product, setOrderList]
    );

    const handleQuantityChange = (action: "add" | "sub") => {
        const increment = action === "add" ? 1 : -1;
        const proposedQty = quantity + increment;
        const nextQty = Math.max(0, Math.min(proposedQty, product.stock));
        setQuantity(nextQty); // update local state first
        syncOrderList(nextQty); // then update parent list
    };

    const totalPrice = product.price * quantity;

    useEffect(() => {
        const externalQty =
            orderList.find((i) => i.product.id === product.id)?.quantity ?? 0;
        setQuantity(externalQty);
    }, [orderList, product.id]);

    return (
        <div className="bg-white border border-coffee-dark/50 rounded-lg overflow-hidden w-full relative">
            <div className="flex items-stretch h-24">
                {/* Product Section */}
                <div className="flex items-center gap-2 size-full">
                    <div className="min-h-24 min-w-24 size-24 rounded-lg border-r border-coffee-dark/50 overflow-hidden relative">
                        <Image
                            src={product.image || "/product-default.jpg"}
                            alt={product.name}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover"
                            priority
                        />
                    </div>

                    <div className="flex justify-between flex-col w-full h-full gap-2 p-2">
                        <div className="flex flex-col">
                            <p className="text-coffee-dark text-sm font-bold truncate">
                                {product.name}
                            </p>
                            <p className="text-coffee-dark text-sm font-bold">
                                {product.price} ฿
                            </p>
                        </div>

                        {/* Button Section */}
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => handleQuantityChange("sub")}
                                className="border border-red-400 text-red-400 rounded-sm size-7 flex items-center justify-center"
                                disabled={quantity === 0}
                            >
                                -
                            </button>
                            <div className="size-8 rounded-md flex items-center justify-center select-none">
                                <p className="text-coffee-dark text-sm font-bold">
                                    {quantity}
                                </p>
                            </div>
                            <button
                                onClick={() => handleQuantityChange("add")}
                                className="border border-emerald-500 text-emerald-500 rounded-sm size-7 flex items-center justify-center"
                            >
                                +
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Total Price Section */}
            {quantity > 0 && (
                <div className="absolute bottom-0 right-2 p-2 text-end">
                    <p className="text-xs text-gray-500">รวม</p>
                    <p className="text-coffee-dark text-sm font-bold">
                        {totalPrice} ฿
                    </p>
                </div>
            )}
            {/* Amount Product */}
            <div className="absolute top-0 right-2 p-2 text-end flex items-center gap-1">
                <p className="text-gray-500 text-xs">
                    {product.stock} {product.unit}
                </p>
            </div>
        </div>
    );
}

export default OrderProductCard;
