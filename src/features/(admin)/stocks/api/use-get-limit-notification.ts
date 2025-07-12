import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";

const api = client.api.admin.stocks["limit-notification"]["$get"];

export const useGetLimitNotification = () => {
    const query = useQuery({
        queryKey: ["limit-notification"],
        queryFn: async () => {
            const response = await api();

            if (!response.ok) {
                throw new Error("Failed to fetch products stock");
            }

            const data = await response.json();

            return data.result;
        },
    });

    return query;
};
