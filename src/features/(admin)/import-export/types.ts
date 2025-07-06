export type HistoryRecordType = {
    id: string;
    productId: string;
    productName: string;
    productUnit: string;
    stock: number;
    type: "import" | "export";
    updatedAt: string;
};
