import { client } from '@/lib/rpc';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const api = client.api.owner.dashboard['stock-history']['$get'];

export const useGetStockHistory = (
    startDate: string,
    endDate: string,
    category: 'วัตถุดิบ' | 'เครื่องดื่ม'
) => {
    const router = useRouter();
    const query = useQuery({
        queryKey: ['stock-history', startDate, endDate, category],
        queryFn: async () => {
            const response = await api({
                query: {
                    startDate,
                    endDate,
                    category,
                },
            });

            if (!response.ok) {
                if (response.status === 403) {
                    throw new Error('Forbidden');
                } else {
                    throw new Error('ไม่พบข้อมูลสต๊อค');
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
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query.error]);

    return query;
};
