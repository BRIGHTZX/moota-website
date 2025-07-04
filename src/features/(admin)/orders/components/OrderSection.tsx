import React from "react";
import ProductCard from "./ProductCard";

function OrderSection() {
    return (
        <div className="bg-coffee-light rounded-lg py-4 px-2 border border-coffee-dark">
            <div className="flex flex-col gap-2">
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
            </div>
        </div>
    );
}

export default OrderSection;
