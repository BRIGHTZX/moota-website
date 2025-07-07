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
