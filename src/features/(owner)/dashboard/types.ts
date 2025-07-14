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

export type ImportExportStockType = {
    productName: string;
    total: number;
    totalIn: number;
    totalOut: number;
};

export type StockHistoryType = {
    productId: string;
    stock: number;
    type: "import" | "export";
};

export type TopDrinkType = {
    productName: string;
    totalAmount: number;
    totalPrice: number;
};
