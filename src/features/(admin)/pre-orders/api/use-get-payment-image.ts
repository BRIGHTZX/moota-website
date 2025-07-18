import { client } from '@/lib/rpc';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const api =
    client.api.admin['pre-orders']['payment-image'][':preOrderId']['$get'];

export const useGetPaymentImage = (preOrderId: string, isOpen: boolean) => {
    const router = useRouter();
    const query = useQuery({
        queryKey: ['admin-pre-orders-payment-image', preOrderId],
        queryFn: async () => {
            const response = await api({ param: { preOrderId } });

            if (!response.ok) {
                if (response.status === 403) {
                    throw new Error('Forbidden');
                } else {
                    throw new Error('ไม่พบข้อมูลรูปภาพการชำระเงิน');
                }
            }

            const data = await response.json();

            return data.result;
        },
        enabled: !!preOrderId && isOpen,
    });

    useEffect(() => {
        if (query.error) {
            if (query.error.message === 'Forbidden') {
                router.push('/forbidden');
            }
            console.error('Error getting carts:', query.error);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query.error]);

    return query;
};
