import { client } from '@/lib/rpc';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const api =
    client.api.admin['import-export']['get-product-info'][':productId']['$get'];

export const useGetImportExportProduct = (productId: string | null) => {
    const router = useRouter();
    const query = useQuery({
        queryKey: ['importExportProduct', productId],
        queryFn: async () => {
            const response = await api({
                param: {
                    productId: productId ?? '',
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

            return data.product;
        },
        enabled: !!productId,
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
