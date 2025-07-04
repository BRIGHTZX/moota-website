import Image from "next/image";
import React from "react";

function ProductCard() {
    return (
        <div className="bg-white border border-coffee-dark/50 rounded-lg overflow-hidden w-full">
            <div className="flex items-stretch h-24">
                {/* Product Section */}
                <div className="flex items-center gap-2 size-full">
                    <div className="min-h-24 min-w-24 size-24 rounded-lg border border-coffee-dark/50 overflow-hidden relative">
                        <Image
                            src="/images/product/product-1.png"
                            alt="product"
                            width={100}
                            height={100}
                            className="object-cover"
                        />
                    </div>

                    <div className="flex justify-between flex-col w-full h-full gap-2 p-2">
                        <p className="text-coffee-dark text-sm font-bold">
                            น้ำเปล่า
                        </p>
                        {/* Button Section */}
                        <div className="flex items-center gap-2">
                            <button className="border border-red-400 text-red-400 rounded-sm size-8 flex items-center justify-center">
                                -
                            </button>
                            <div className="size-8  rounded-md flex items-center justify-center">
                                <p className="text-coffee-dark text-sm font-bold">
                                    1
                                </p>
                            </div>
                            <button className="border border-emerald-500 text-emerald-500 rounded-sm size-8 flex items-center justify-center">
                                +
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;
