import BarMultipleChart from "@/components/charts/BarMultipleChart";
import React from "react";
import { DateModeType, TotalIncomeOutcomeType } from "../types";
import { useGetTotalIncomeOutcome } from "../api/use-get-total-income-outcome";

function IncomeOutComeSections({
    startDate,
    endDate,
    mode,
}: {
    startDate: string;
    endDate: string;
    mode: DateModeType;
}) {
    const { data, isLoading } = useGetTotalIncomeOutcome(
        startDate,
        endDate,
        mode
    );

    return (
        <BarMultipleChart<TotalIncomeOutcomeType>
            title="รายรับ-รายจ่าย"
            data={data as TotalIncomeOutcomeType[]}
            config={{
                income: {
                    label: "รายรับ",
                    key: "income",
                    color: "#2C7FFF",
                },
                outcome: {
                    label: "รายจ่าย",
                    key: "outcome",
                    color: "#8EC6FF",
                },
            }}
        />
    );
}

export default IncomeOutComeSections;
