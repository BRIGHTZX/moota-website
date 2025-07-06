import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";

const api =
    client.api.admin.orders["get-activeInfo-tableNumber"][":activeInfoId"][
        "$get"
    ];

export const useGetActiveInfoTableNumber = (activeInfoId: string) => {
    const query = useQuery({
        queryKey: ["get-activeInfo-tableNumber", activeInfoId],
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
