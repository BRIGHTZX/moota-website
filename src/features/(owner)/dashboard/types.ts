export type DateModeType = "day" | "month" | "custom";
export type DateRageType = {
    startDate: string;
    endDate: string;
};

export type TotalCountInfomationType = {
    totalAdult: number;
    totalChild: number;
    totalAmount: number;
    totalOrder: number;
    totalPreOrder: number;
};

export type TotalIncomeOutcomeType = {
    date: string;
    income: number;
    outcome: number;
};

export type TotalCustomerType = {
    date: string;
    total: number;
};
