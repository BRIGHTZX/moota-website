import { client } from '@/lib/rpc';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const api = client.api.admin.stocks['detail'][':productId']['$get'];

export const useGetProductStock = (productId: string) => {
    const router = useRouter();
    const query = useQuery({
        queryKey: ['product-stock', productId],
        queryFn: async () => {
            const response = await api({
                param: {
                    productId: productId,
                },
            });

            if (!response.ok) {
                if (response.status === 403) {
                    throw new Error('Forbidden');
                } else {
                    throw new Error('ไม่พบข้อมูลสินค้า');
                }
            }

            const data = await response.json();

            return data.product;
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
