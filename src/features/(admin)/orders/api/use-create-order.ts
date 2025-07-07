import { client } from "@/lib/rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";
import { OrderItem } from "../types";

const api = client.api.admin.orders["create-order"]["$post"];
type RequestType = InferRequestType<typeof api>;
type ResponseType = InferResponseType<typeof api>;

type CreateOrderProps = {
    activeInfoId: string;
    setOrderList: (orderList: OrderItem[]) => void;
};

export const useCreateOrder = ({
    activeInfoId,
    setOrderList,
}: CreateOrderProps) => {
    const queryClient = useQueryClient();
    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async ({ json }) => {
            const response = await api({ json });

            if (!response.ok) {
                throw new Error("Failed to create order");
            }

            const data = await response.json();

            return data;
        },
        onSuccess: () => {
            toast.success("สร้างรายการสั่งซื้อสำเร็จ");
            setOrderList([]);
            queryClient.invalidateQueries({
                queryKey: ["product-drink-list"],
            });
            queryClient.invalidateQueries({
                queryKey: ["order-history", activeInfoId],
            });
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    return mutation;
};
