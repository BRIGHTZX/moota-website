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
    updatedAt: string | null;
    tables: TableType[];
};

export type TableType = {
    tableId: string;
    tableNumber: string;
};
