import { client } from '@/lib/rpc';
import { useQuery } from '@tanstack/react-query';

const api = client.api.admin['take-away']['history']['$get'];

type UseGetTakeAwayHistoryProps = {
    startDate: string;
    endDate: string;
};

export const useGetTakeAwayHistory = ({
    startDate,
    endDate,
}: UseGetTakeAwayHistoryProps) => {
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
                throw new Error('Failed to fetch products stock');
            }

            const data = await response.json();

            return data.result;
        },
    });

    return query;
};
