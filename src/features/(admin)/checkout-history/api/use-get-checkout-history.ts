import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";

const api = client.api.admin["checkout-history"][":checkoutId"]["$get"];

export const useGetCheckoutHistory = ({
    checkoutId,
}: {
    checkoutId: string;
}) => {
    const query = useQuery({
        queryKey: ["checkout-history", checkoutId],
        queryFn: async () => {
            const response = await api({
                param: {
                    checkoutId,
                },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch checkout history");
            }

            const data = await response.json();

            return data.result;
        },
        enabled: !!checkoutId,
    });

    return query;
};
