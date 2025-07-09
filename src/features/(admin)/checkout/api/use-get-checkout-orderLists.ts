import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";

const api = client.api.admin.checkout["get-order-lists"]["$post"];

export const useGetCheckoutOrderLists = (activeInfoId: string[]) => {
    return useQuery({
        queryKey: ["checkout-order-lists", activeInfoId],
        queryFn: async () => {
            const response = await api({
                json: {
                    activeInfoId,
                },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch reservation");
            }

            const data = await response.json();

            return data.result;
        },
        enabled: !!activeInfoId,
    });
};
