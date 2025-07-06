export type ActiveType = {
    activeId: string;
    customerName: string;
    customerPhone: string;
    adultNumber: number;
    childNumber: number;
    openTime: string;
    activeInfo: {
        activeInfoId: string;
        tableId: string;
        tableNumber: string;
    }[];
};
