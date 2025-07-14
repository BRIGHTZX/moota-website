import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";

const api = client.api.owner.dashboard["stock-history"]["$get"];

export const useGetStockHistory = (
    startDate: string,
    endDate: string,
    category: "วัตถุดิบ" | "เครื่องดื่ม"
) => {
    const query = useQuery({
        queryKey: ["stock-history", startDate, endDate, category],
        queryFn: async () => {
            const response = await api({
                query: {
                    startDate,
                    endDate,
                    category,
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
