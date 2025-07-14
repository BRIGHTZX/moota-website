import React from "react";
import { FaCalendarCheck, FaMoneyBillWave, FaUser } from "react-icons/fa";
import { useGetTotalCountInfomation } from "../api/use-get-total-count-infomation";
import { TotalCountInfomationType } from "../types";
import { Skeleton } from "@/components/ui/skeleton";

type TotalCardSectionProps = {
    startDate: string;
    endDate: string;
};

function TotalCardSection({ startDate, endDate }: TotalCardSectionProps) {
    const {
        data: totalCountInfomation,
        isLoading: isLoadingTotalCountInfomation,
    } = useGetTotalCountInfomation(startDate, endDate);

    const { totalAmount, totalAdult, totalChild, totalPreOrder, totalOrder } =
        (totalCountInfomation as TotalCountInfomationType) ?? {
            totalAmount: 0,
            totalAdult: 0,
            totalChild: 0,
            totalPreOrder: 0,
            totalOrder: 0,
        };
    const isLoading = isLoadingTotalCountInfomation;
    return (
        <>
            <div className="size-full grid grid-cols-2 gap-2">
                <TotalCard
                    title="ยอดขาย"
                    value={totalAmount}
                    icon={<FaMoneyBillWave />}
                    isLoading={isLoading}
                />
                <TotalCard
                    title="จำนวนคน"
                    value={totalAdult + totalChild}
                    icon={<FaUser />}
                    isLoading={isLoading}
                />
                <TotalCard
                    title="จำนวนการจอง"
                    value={totalPreOrder}
                    icon={<FaCalendarCheck />}
                    isLoading={isLoading}
                />
                <TotalCard
                    title="ออเดอร์ทั้งหมด"
                    value={totalOrder}
                    icon={<FaCalendarCheck />}
                    isLoading={isLoading}
                />
            </div>
        </>
    );
}

export default TotalCardSection;

const TotalCard = ({
    title,
    value,
    icon,
    isLoading,
}: {
    title: string;
    value: number;
    icon: React.ReactNode;
    isLoading: boolean;
}) => {
    return (
        <>
            <div className="size-full bg-white rounded-lg p-4 border">
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                        <span>{icon}</span>
                        <p className="text-sm font-medium">{title}</p>
                    </div>

                    {isLoading ? (
                        <Skeleton className="rounded-lg w-full h-[30px]" />
                    ) : (
                        <div>
                            <p className="text-2xl font-semibold">
                                {value.toLocaleString()}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};
