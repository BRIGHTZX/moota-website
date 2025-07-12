import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";

const api = client.api.owner.dashboard["total-count-infomation"]["$get"];

export const useGetTotalCountInfomation = (
    startDate: string,
    endDate: string
) => {
    const query = useQuery({
        queryKey: ["total-count-infomation", startDate, endDate],
        queryFn: async () => {
            const response = await api({
                query: {
                    startDate,
                    endDate,
                },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch pre-orders");
            }

            const data = await response.json();

            return data.result;
        },
        enabled: !!startDate && !!endDate,
    });

    return query;
};
