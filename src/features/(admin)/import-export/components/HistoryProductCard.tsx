import React from "react";
import { HistoryRecordType } from "../types";
import { MinusIcon, PlusIcon } from "lucide-react";

function HistoryProductCard({ record }: { record: HistoryRecordType }) {
    const textColor =
        record.type === "import" ? "text-green-500" : "text-red-500";
    return (
        <div className="bg-white p-4 border rounded-lg shadow-md">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    {record.type === "import" ? (
                        <PlusIcon className="w-4 h-4 text-green-500" />
                    ) : (
                        <MinusIcon className="w-4 h-4 text-red-500" />
                    )}
                    <p className={`${textColor} text-md font-bold`}>
                        {record.productName}
                    </p>
                </div>

                <p className={`${textColor} text-md font-bold`}>
                    {record.stock} {record.productUnit}
                </p>
            </div>
        </div>
    );
}

export default HistoryProductCard;
