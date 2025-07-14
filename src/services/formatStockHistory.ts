import { StockHistoryType } from "@/features/(owner)/dashboard/types";

type FormattedStockHistoryType = {
    productId: string;
    totalIn: number;
    totalOut: number;
};

export const formatStockHistory = (stockHistory: StockHistoryType[]) => {
    const resultMap = new Map<string, FormattedStockHistoryType>();

    for (const item of stockHistory) {
        const { productId, stock, type } = item;

        if (!resultMap.has(productId)) {
            resultMap.set(productId, {
                productId,
                totalIn: 0,
                totalOut: 0,
            });
        }

        const existProduct = resultMap.get(productId);

        if (existProduct) {
            if (type === "import") {
                existProduct.totalIn += stock;
            } else {
                existProduct.totalOut += stock;
            }
        }

        return Array.from(resultMap.values());
    }
};
