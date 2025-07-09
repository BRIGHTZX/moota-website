import React from "react";
import { TotalProduct } from "../types";

function TotalProductCard({ product }: { product: TotalProduct }) {
    return (
        <div className="flex items-center justify-between border border-gray-300 bg-gray-50 rounded-md px-4 py-2">
            <div className="flex flex-col items-start">
                <p>{product.productName}</p>

                <p className="text-sm text-gray-500">
                    {product.pricePerUnit} ฿ x {product.quantity}
                </p>
            </div>
            <p className="text-md font-bold text-black">
                {product.totalPrice} ฿
            </p>
        </div>
    );
}

export default TotalProductCard;
