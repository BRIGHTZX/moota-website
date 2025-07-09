export type ActiveInfo = {
    activeInfoId: string;
    tableId: string;
    tableNumber: string;
};

export type CheckoutInfo = {
    activeId: string;
    customerName: string;
    customerPhone: string;
    adultNumber: number;
    childNumber: number;
    activeInfo: ActiveInfo[];
};

export type SelectedTable = {
    activeInfoId: string;
    tableId: string;
    tableNumber: string;
};

export type TotalProduct = {
    productId: string;
    productName: string;
    pricePerUnit: number;
    quantity: number;
    totalPrice: number;
};

export const checkoutStatus = ["partial", "closed"] as const;
export type CheckoutStatus = (typeof checkoutStatus)[number];
export type PaymentMethod = "cash" | "promptpay";
