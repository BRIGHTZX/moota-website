import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";

const api = client.api.admin["pre-orders"][":preOrderId"]["$get"];

export const useGetOrder = (preOrderId: string) => {
    return useQuery({
        queryKey: ["order", preOrderId],
        queryFn: async () => {
            const response = await api({ param: { preOrderId } });

            if (!response.ok) {
                throw new Error("Failed to fetch order");
            }

            const data = await response.json();

            return data.result;
        },
    });
};
