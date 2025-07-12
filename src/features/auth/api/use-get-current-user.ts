import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";

const api = client.api.authentication["user-current"]["$get"];

export const useGetCurrentUser = () => {
    const query = useQuery({
        queryKey: ["user-current"],
        queryFn: async () => {
            const response = await api();
            if (!response.ok) {
                throw new Error("Failed to fetch user current");
            }

            const data = await response.json();

            return data.result;
        },
        retry: false,
    });
    return query;
};
