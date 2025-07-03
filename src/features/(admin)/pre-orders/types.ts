export type OrderType = {
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
    tables: TableType[];
};

export type TableType = {
    preOrderId: string;
    id: string;
    tableNumber: string;
};
