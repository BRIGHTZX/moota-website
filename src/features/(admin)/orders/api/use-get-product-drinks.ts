import { client } from '@/lib/rpc';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const api = client.api.admin.orders['product-drink-list']['$get'];

export const useGetProductDrinks = () => {
    const router = useRouter();
    const query = useQuery({
        queryKey: ['product-drink-list'],
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
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query.error]);

    return query;
};
