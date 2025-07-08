export type PreOrderType = {
    id: string;
    preOrderNumber: string;
    customerName: string;
    phoneNumber: string;
    adultNumber: number;
    childNumber: number;
    totalPrice: number;
    reservationDate: string;
    reservationTime: string;
    status: string;
    paymentStatus: string;
    createdAt: string;
    tables: {
        tableId: string;
        tableNumber: string;
    }[];
};

export type PreOrderStatus = "pending" | "confirmed" | "canceled";
export type PreOrderPaymentStatus = "unpaid" | "paid";
