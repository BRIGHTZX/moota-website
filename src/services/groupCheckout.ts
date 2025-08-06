type PaymentInfo = {
    groupType: 'adult' | 'child';
    quantity: number;
    pricePerUnit: number;
    totalPrice: number;
    paymentMethod: 'cash' | 'promptpay';
    createdAt: string | Date;
};

type GroupedPaymentRound = {
    createdAt: string;
    payments: PaymentInfo[];
};

export function groupCheckoutByCreatedAt(
    data: PaymentInfo[]
): GroupedPaymentRound[] {
    const grouped = new Map<string, PaymentInfo[]>();

    for (const item of data) {
        const createdKey = new Date(item.createdAt).toISOString(); // normalize
        if (!grouped.has(createdKey)) {
            grouped.set(createdKey, []);
        }
        grouped.get(createdKey)!.push(item);
    }

    return Array.from(grouped.entries())
        .sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime())
        .map(([createdAt, payments]) => ({ createdAt, payments }));
}
