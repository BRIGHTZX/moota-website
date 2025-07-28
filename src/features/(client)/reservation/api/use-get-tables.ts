import { client } from '@/lib/rpc';
import { useQuery } from '@tanstack/react-query';

const api = client.api.reservation.tables['$get'];

export const useGetTables = () => {
    return useQuery({
        queryKey: ['tables'],
        queryFn: async () => {
            const response = await api();

            if (!response.ok) {
                throw new Error('Failed to fetch tables');
            }

            const data = await response.json();

            console.log(data.result);
            return data.result;
        },
    });
};
