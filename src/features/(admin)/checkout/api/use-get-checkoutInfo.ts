import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";

const api = client.api.admin.checkout["checkout-info"][":activeId"]["$get"];

export const useGetCheckoutInfo = (activeId: string) => {
    return useQuery({
        queryKey: ["checkout-info", activeId],
        queryFn: async () => {
            const response = await api({
                param: {
                    activeId,
                },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch reservation");
            }

            const data = await response.json();

            return data.result;
        },
        enabled: !!activeId,
    });
};
