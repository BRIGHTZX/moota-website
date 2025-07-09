import { client } from "@/lib/rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

const api = client.api.admin.checkout["checkout"][":activeId"]["$post"];
type RequestType = InferRequestType<typeof api>;
type ResponseType = InferResponseType<typeof api>;

type CreateCheckoutType = {
    activeId: string;
    activeInfoId: string[];
};

export const useCreateCheckout = ({
    activeId,
    activeInfoId,
}: CreateCheckoutType) => {
    const queryClient = useQueryClient();
    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async ({ param, json }) => {
            const response = await api({
                json,
                param: {
                    activeId: param.activeId,
                },
            });

            if (!response.ok) {
                throw new Error("Failed to create checkout");
            }

            const data = await response.json();

            return data;
        },

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["checkout-info", activeId],
            });
            queryClient.invalidateQueries({
                queryKey: ["checkout-order-lists", activeInfoId],
            });
            toast.success("สร้างรายการชำระเงินสำเร็จ");
        },
        onError: (error) => {
            console.log(error);
            toast.error("สร้างรายการชำระเงินไม่สำเร็จ");
        },
    });

    return mutation;
};
