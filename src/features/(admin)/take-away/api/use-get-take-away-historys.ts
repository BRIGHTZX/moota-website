import { client } from '@/lib/rpc';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const api = client.api.admin['take-away']['history']['$get'];

type UseGetTakeAwayHistoryProps = {
    startDate: string;
    endDate: string;
};

export const useGetTakeAwayHistory = ({
    startDate,
    endDate,
}: UseGetTakeAwayHistoryProps) => {
    const router = useRouter();
    const query = useQuery({
        queryKey: ['take-away-history'],
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
                    throw new Error('ไม่พบข้อมูลการสั่งซื้อกลับบ้าน');
                }
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
