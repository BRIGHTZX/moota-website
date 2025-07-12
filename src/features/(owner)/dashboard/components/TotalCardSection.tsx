import React from "react";
import { TotalCountInfomationType } from "../types";
import { FaCalendarCheck, FaMoneyBillWave, FaUser } from "react-icons/fa";

type TotalCardSectionProps = {
    totalCountInfomation: TotalCountInfomationType;
};

function TotalCardSection({ totalCountInfomation }: TotalCardSectionProps) {
    return (
        <div className="size-full grid grid-cols-2 gap-4">
            <TotalCard
                title="ยอดขาย"
                value={totalCountInfomation.totalAmount}
                icon={<FaMoneyBillWave />}
            />
            <TotalCard
                title="จำนวนคน"
                value={
                    totalCountInfomation.totalAdult +
                    totalCountInfomation.totalChild
                }
                icon={<FaUser />}
            />
            <TotalCard
                title="จำนวนการจอง"
                value={totalCountInfomation.totalPreOrder}
                icon={<FaCalendarCheck />}
            />
            <TotalCard
                title="ออเดอร์ทั้งหมด"
                value={totalCountInfomation.totalOrder}
                icon={<FaCalendarCheck />}
            />
        </div>
    );
}

export default TotalCardSection;

const TotalCard = ({
    title,
    value,
    icon,
}: {
    title: string;
    value: number;
    icon: React.ReactNode;
}) => {
    return (
        <div className="size-full bg-white rounded-lg p-4 border">
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                    <span>{icon}</span>
                    <p className="text-sm font-medium">{title}</p>
                </div>

                <div>
                    <p className="text-2xl font-semibold">
                        {value.toLocaleString()}
                    </p>
                </div>
            </div>
        </div>
    );
};
