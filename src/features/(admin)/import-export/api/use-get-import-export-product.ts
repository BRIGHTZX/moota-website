import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";

const api = client.api.admin["import-export"][":productId"]["$get"];

export const useGetImportExportProduct = (productId: string | null) => {
    const query = useQuery({
        queryKey: ["importExportProduct", productId],
        queryFn: async () => {
            const response = await api({
                param: {
                    productId: productId ?? "",
                },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch product");
            }

            const data = await response.json();

            return data.product;
        },
        enabled: !!productId,
    });

    return query;
};
