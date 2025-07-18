import { client } from '@/lib/rpc';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const api =
    client.api.admin.orders['get-activeInfo-tableNumber'][':activeInfoId'][
        '$get'
    ];

export const useGetActiveInfoTableNumber = (activeInfoId: string) => {
    const router = useRouter();
    const query = useQuery({
        queryKey: ['get-activeInfo-tableNumber', activeInfoId],
        queryFn: async () => {
            const response = await api({
                param: {
                    activeInfoId,
                },
            });

            if (!response.ok) {
                if (response.status === 403) {
                    throw new Error('Forbidden');
                } else {
                    throw new Error('ไม่พบข้อมูลตารางนั่ง');
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
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query.error]);

    return query;
};
