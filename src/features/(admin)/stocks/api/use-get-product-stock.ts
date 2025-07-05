import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";

const api = client.api.admin.stocks["detail"][":productId"]["$get"];

export const useGetProductStock = (productId: string) => {
    const query = useQuery({
        queryKey: ["product-stock", productId],
        queryFn: async () => {
            const response = await api({
                param: {
                    productId: productId,
                },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch products stock");
            }

            const data = await response.json();

            return data.product;
        },
    });

    return query;
};
