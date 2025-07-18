import { client } from '@/lib/rpc';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const api = client.api.admin['checkout-history']['$get'];

export const useGetCheckoutsHistory = (startDate: string, endDate: string) => {
    const router = useRouter();
    const query = useQuery({
        queryKey: ['checkouts-history', startDate, endDate],
        queryFn: async () => {
            const response = await api({
                query: {
                    startDate,
                    endDate,
                },
            });

            if (!response.ok) {
                if (response.status === 403) {
                    throw new Error('Forbidden');
                } else {
                    throw new Error('Failed to fetch actives');
                }
            }

            const data = await response.json();

            return data.result;
        },
        enabled: !!startDate && !!endDate,
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
