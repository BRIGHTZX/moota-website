import Image from "next/image";
import React from "react";

function StockProductSection() {
    return (
        <div className="bg-coffee-light border border-coffee-dark rounded-lg p-4 relative">
            <div className="flex flex-col justify-center gap-2">
                <div className="size-18 rounded-lg border border-coffee-dark/50 overflow-hidden relative">
                    <Image
                        src="/product/leo.jpg"
                        alt="product"
                        width={100}
                        height={100}
                        className="object-cover size-full"
                    />
                </div>

                <div className="flex flex-col text-center gap-2">
                    <p className="text-coffee-dark text-sm font-bold">leo</p>
                    <p className="text-coffee-dark text-sm font-bold">
                        100 ขวด
                    </p>
                </div>
            </div>
        </div>
    );
}

export default StockProductSection;
