import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";

const api = client.api.admin.orders["product-drink-list"]["$get"];

export const useGetProductDrinks = () => {
    const query = useQuery({
        queryKey: ["product-drink-list"],
        queryFn: async () => {
            const response = await api();

            if (!response.ok) {
                throw new Error("Failed to fetch products stock");
            }

            const data = await response.json();

            return data.result;
        },
    });

    return query;
};
