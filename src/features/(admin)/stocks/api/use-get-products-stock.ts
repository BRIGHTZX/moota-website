import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";

const api = client.api.admin.stocks["$get"];

export const useGetProductsStock = () => {
    const query = useQuery({
        queryKey: ["products-stock"],
        queryFn: async () => {
            const response = await api();

            if (!response.ok) {
                throw new Error("Failed to fetch products stock");
            }

            const data = await response.json();

            return data.products;
        },
    });

    return query;
};
