import { client } from '@/lib/rpc';
import { useQuery } from '@tanstack/react-query';

const api =
    client.api.admin['pre-orders']['payment-image'][':preOrderId']['$get'];

export const useGetPaymentImage = (preOrderId: string, isOpen: boolean) => {
    return useQuery({
        queryKey: ['admin-pre-orders-payment-image', preOrderId],
        queryFn: async () => {
            const response = await api({ param: { preOrderId } });

            if (!response.ok) {
                throw new Error('Failed to fetch order');
            }

            const data = await response.json();

            return data.result;
        },
        enabled: !!preOrderId && isOpen,
    });
};
