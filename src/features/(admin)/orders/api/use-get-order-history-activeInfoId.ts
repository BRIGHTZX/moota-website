import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";

const api = client.api.admin.orders["order-history"][":activeInfoId"]["$get"];

export const useGetOrderHistoryActiveInfoId = (activeInfoId: string) => {
    const query = useQuery({
        queryKey: ["order-history", activeInfoId],
        queryFn: async () => {
            const response = await api({
                param: {
                    activeInfoId,
                },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch products stock");
            }

            const data = await response.json();

            return data.result;
        },
    });

    return query;
};
