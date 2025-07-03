export type ActiveType = {
    activeId: string;
    customerName: string;
    customerPhone: string;
    openTime: string;
    activeInfo: {
        activeInfoId: string;
        tableId: string;
        tableNumber: string;
        customerAdult: number;
        customerChild: number;
    }[];
};
