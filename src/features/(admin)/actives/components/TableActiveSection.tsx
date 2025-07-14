import { TextCardInfo } from "@/components/TextCardInfo";
import React from "react";
import { ActiveType } from "../types";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type TableActiveSectionProps = {
    active: ActiveType;
    setOpenAlertDialog: (open: boolean) => void;
    setActiveId: (activeId: string) => void;
};

function TableActiveSection({
    active,
    setOpenAlertDialog,
    setActiveId,
}: TableActiveSectionProps) {
    const {
        customerName,
        customerPhone,
        openTime,
        activeInfos,
        adultNumber,
        childNumber,
    } = active;

    return (
        <div className="border border-gray-300 shadow-sm rounded-lg p-4 relative bg-white">
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
                {activeInfos?.map((info) => (
                    <HaveTable
                        key={info.activeInfoId}
                        activeInfoId={info.activeInfoId}
                        tableNumber={info.tableNumber}
                    />
                ))}
            </div>

            <div className="mt-4 flex justify-end">
                <Button
                    size="sm"
                    className="bg-red-500 hover:bg-red-600  px-8"
                    onClick={() => {
                        setOpenAlertDialog(true);
                        setActiveId(active.activeId);
                    }}
                >
                    ปิดโต๊ะ
                </Button>
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
            <div className="bg-blue-300 rounded-lg p-4 border border-black cursor-pointer hover:bg-blue-400 transition-all duration-300">
                <p className="text-black text-xs text-center font-bold">
                    {tableNumber}
                </p>
            </div>
        </Link>
    );
};
