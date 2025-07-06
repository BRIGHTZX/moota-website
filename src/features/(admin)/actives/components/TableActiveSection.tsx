import { TextCardInfo } from "@/components/TextCardInfo";
import React from "react";
import { ActiveType } from "../types";
import Link from "next/link";

type TableActiveSectionProps = {
    active: ActiveType;
};

function TableActiveSection({ active }: TableActiveSectionProps) {
    const {
        customerName,
        customerPhone,
        openTime,
        activeInfo,
        adultNumber,
        childNumber,
    } = active;

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
                    value={adultNumber.toString()}
                />
                <TextCardInfo
                    text="จำนวนเด็ก :"
                    value={childNumber.toString()}
                />
            </div>
            {/* Table Info */}
            <div className="grid grid-cols-3 gap-2 mt-4">
                {activeInfo?.map((info) => (
                    <HaveTable
                        key={info.activeInfoId}
                        activeInfoId={info.activeInfoId}
                        tableNumber={info.tableNumber}
                    />
                ))}
            </div>
        </div>
    );
}

export default TableActiveSection;

const HaveTable = ({
    activeInfoId,
    tableNumber,
}: {
    activeInfoId: string;
    tableNumber: string;
}) => {
    return (
        <Link href={`/admin/actives/orders/${activeInfoId}`}>
            <div className="bg-coffee-light rounded-lg p-4 border border-coffee-dark cursor-pointer hover:bg-coffee-brown transition-all duration-300">
                <p className="text-coffee-dark text-xs text-center font-bold">
                    {tableNumber}
                </p>
            </div>
        </Link>
    );
};
