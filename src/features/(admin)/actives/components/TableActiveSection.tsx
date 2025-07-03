import { TextCardInfo } from "@/components/TextCardInfo";
import React from "react";
import { ActiveType } from "../types";
import Link from "next/link";

type TableActiveSectionProps = {
    active: ActiveType;
};

function TableActiveSection({ active }: TableActiveSectionProps) {
    console.log(active);
    const { customerName, customerPhone, openTime, activeInfo } = active;
    const totalAdult = (activeInfo ?? []).reduce(
        (acc, curr) => acc + curr.customerAdult,
        0
    );
    const totalChild = (activeInfo ?? []).reduce(
        (acc, curr) => acc + curr.customerChild,
        0
    );

    return (
        <div className="border border-coffee-dark rounded-lg p-4 relative">
            {/* Time Info */}
            <div className="text-right">
                <p className="text-gray-500 text-xs font-bold">
                    เปิดโต๊ะเวลา {openTime} น.
                </p>
            </div>

            {/* Customer Info */}
            <div className="flex flex-col gap-2 mt-4">
                <TextCardInfo text="ชื่อลูกค้า :" value={customerName} />
                <TextCardInfo
                    text="เบอร์โทรศัพท์ :"
                    value={customerPhone || "-"}
                />
                <TextCardInfo
                    text="จำนวนผู้ใหญ่ :"
                    value={totalAdult.toString()}
                />
                <TextCardInfo
                    text="จำนวนเด็ก :"
                    value={totalChild.toString()}
                />
            </div>
            {/* Table Info */}
            <div className="grid grid-cols-3 gap-2 mt-4">
                {activeInfo?.map((info) => (
                    <HaveTable
                        key={info.activeInfoId}
                        tableId={info.tableId}
                        tableNumber={info.tableNumber}
                    />
                ))}
            </div>
        </div>
    );
}

export default TableActiveSection;

const HaveTable = ({
    tableId,
    tableNumber,
}: {
    tableId: string;
    tableNumber: string;
}) => {
    return (
        <Link href={`/admin/tables/${tableId}`}>
            <div className="bg-coffee-light rounded-lg p-4 border border-coffee-dark">
                <p className="text-coffee-dark text-xs text-center font-bold">
                    {tableNumber}
                </p>
            </div>
        </Link>
    );
};
