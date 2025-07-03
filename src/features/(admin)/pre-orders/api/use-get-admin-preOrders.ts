import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";

const api = client.api.admin["pre-orders"]["$get"];

export const useGetOrders = () => {
    const query = useQuery({
        queryKey: ["orders"],
        queryFn: async () => {
            const response = await api();

            if (!response.ok) {
                throw new Error("Failed to fetch pre-orders");
            }

            const data = await response.json();

            return data.result;
        },
    });

    return query;
};
