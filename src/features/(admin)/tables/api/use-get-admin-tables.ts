import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";

const api = client.api.admin.tables["$get"];

export const useGetAdminTables = () => {
    return useQuery({
        queryKey: ["admin-tables"],
        queryFn: async () => {
            const response = await api();

            if (!response.ok) {
                throw new Error("Failed to fetch tables");
            }

            const data = await response.json();

            return data;
        },
    });
};
