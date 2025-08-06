import { client } from '@/lib/rpc';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const api = client.api.admin.actives[':activeId']['$get'];

export const useGetActive = (activeId: string) => {
    const router = useRouter();
    const query = useQuery({
        queryKey: ['admin-active', activeId],
        queryFn: async () => {
            const response = await api({
                param: {
                    activeId,
                },
            });

            if (!response.ok) {
                if (response.status === 403) {
                    throw new Error('Forbidden');
                } else {
                    throw new Error('Failed to fetch active');
                }
            }

            const data = await response.json();

            return data.result;
        },
        enabled: !!activeId,
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
