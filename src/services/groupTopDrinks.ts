import {
    TopDrinkRawType,
    TopDrinkType,
} from "@/features/(owner)/dashboard/types";

export const groupTopDrinks = (products: TopDrinkRawType[]) => {
    const resultMap = new Map<string, TopDrinkType>();

    for (const item of products) {
        const { productId, quantity, totalPrice, product } = item;
        const { name: productName } = product;
        if (!resultMap.has(productId)) {
            resultMap.set(productId, {
                productId,
                productName,
                quantity: item.quantity + quantity,
                totalPrice: item.totalPrice + totalPrice,
            });
        }

        const existingItem = resultMap.get(productId);
        if (existingItem) {
            resultMap.set(productId, {
                ...existingItem,
                quantity: existingItem.quantity + quantity,
                totalPrice: existingItem.totalPrice + totalPrice,
            });
        }
    }
    return Array.from(resultMap.values())
        .slice(0, 10)
        .sort((a, b) => b.totalPrice - a.totalPrice);
};
