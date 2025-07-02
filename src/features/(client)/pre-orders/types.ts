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
        id: string;
        tableNumber: string;
    }[];
};
