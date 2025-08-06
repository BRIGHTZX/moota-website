export type ActiveType = {
    activeId: string;
    customerName: string;
    customerPhone: string;
    adultNumber: number;
    childNumber: number;
    openTime: string;
    updatedAt: string;
    activeInfos: {
        activeInfoId: string;
        tableId: string;
        tableNumber: string;
    }[];
};

export type ActiveDataType = {
    customerName: string;
    customerPhone: string;
    adultNumber: string;
    childNumber: string;
};
