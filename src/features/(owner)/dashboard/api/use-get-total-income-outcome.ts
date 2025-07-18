import { client } from '@/lib/rpc';
import { useQuery } from '@tanstack/react-query';
import { DateModeType } from '../types';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const api = client.api.owner.dashboard['total-income-outcome']['$get'];

export const useGetTotalIncomeOutcome = (
    startDate: string,
    endDate: string,
    mode: DateModeType
) => {
    const router = useRouter();
    const query = useQuery({
        queryKey: ['total-income-outcome', startDate, endDate, mode],
        queryFn: async () => {
            const response = await api({
                query: {
                    startDate,
                    endDate,
                    mode,
                },
            });

            if (!response.ok) {
                if (response.status === 403) {
                    throw new Error('Forbidden');
                } else {
                    throw new Error('ไม่พบข้อมูลรายรับรายจ่าย');
                }
            }

            const data = await response.json();

            return data.result;
        },
        enabled: !!startDate && !!endDate && !!mode,
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
