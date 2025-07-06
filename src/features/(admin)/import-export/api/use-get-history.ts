import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";

const api = client.api.admin["import-export"]["$get"];

export const useGetHistory = (startDate: string, endDate: string) => {
    const query = useQuery({
        queryKey: ["importExportProduct", startDate, endDate],
        queryFn: async () => {
            const response = await api({
                query: {
                    startDate,
                    endDate,
                },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch product");
            }

            const data = await response.json();

            return data.history;
        },
        enabled: !!startDate && !!endDate,
    });

    return query;
};
