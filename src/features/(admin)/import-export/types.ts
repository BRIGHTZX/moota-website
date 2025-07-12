export type HistoryRecordType = {
    id: string;
    productId: string;
    productName: string;
    productUnit: string;
    stock: number;
    totalPrice: number;
    type: "import" | "export";
    updatedAt: string;
};
