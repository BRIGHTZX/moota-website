import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";

const api = client.api.admin["checkout-history"]["$get"];

export const useGetCheckoutsHistory = (startDate: string, endDate: string) => {
    const query = useQuery({
        queryKey: ["checkouts-history", startDate, endDate],
        queryFn: async () => {
            const response = await api({
                query: {
                    startDate,
                    endDate,
                },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch checkouts history");
            }

            const data = await response.json();

            return data.result;
        },
        enabled: !!startDate && !!endDate,
    });

    return query;
};
