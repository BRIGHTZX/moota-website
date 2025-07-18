import { client } from '@/lib/rpc';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const api = client.api.admin.stocks['limit-notification']['$get'];

export const useGetLimitNotification = () => {
    const router = useRouter();
    const query = useQuery({
        queryKey: ['limit-notification'],
        queryFn: async () => {
            const response = await api();

            if (!response.ok) {
                throw new Error('Failed to fetch products stock');
            }

            const data = await response.json();

            return data.result;
        },
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
