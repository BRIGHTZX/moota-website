import { client } from "@/lib/rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

const api = client.api.admin.stocks[":productId"]["$put"];
type RequestType = InferRequestType<typeof api>;
type ResponseType = InferResponseType<typeof api>;

export const useUpdateProductStock = ({ productId }: { productId: string }) => {
    const queryClient = useQueryClient();
    return useMutation<ResponseType, Error, RequestType>({
        mutationFn: async ({ param, form }) => {
            const response = await api({
                param,
                form,
            });

            if (!response.ok) {
                throw new Error("Failed to update product stock");
            }

            const data = await response.json();

            return data;
        },
        onSuccess: () => {
            toast.success("อัพเดตสินค้าเรียบร้อย");
            queryClient.invalidateQueries({
                queryKey: ["product-stock", productId],
            });
        },
        onError: (error) => {
            toast.error("อัพเดตสินค้าไม่สำเร็จ");
            console.log(error);
        },
    });
};
