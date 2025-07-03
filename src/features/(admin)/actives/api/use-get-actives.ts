import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";

const api = client.api.admin.actives["$get"];

export const useGetActives = () => {
    const query = useQuery({
        queryKey: ["admin-actives"],
        queryFn: async () => {
            const response = await api();

            if (!response.ok) {
                throw new Error("Failed to fetch actives");
            }

            const data = await response.json();

            return data.result;
        },
    });
    return query;
};
