import { client } from "@/lib/rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

const api = client.api.reservation[":preOrderId"]["$patch"];
type ResponseType = InferResponseType<typeof api>;
type RequestType = InferRequestType<typeof api>;

export const useUpdatePaymentImage = (preOrderId: string) => {
    const queryClient = useQueryClient();
    return useMutation<ResponseType, Error, RequestType>({
        mutationFn: async ({ form, param }) => {
            const response = await api({
                param: {
                    preOrderId: param.preOrderId,
                },
                form,
            });

            if (!response.ok) {
                throw new Error("Failed to update payment image");
            }

            const data = await response.json();

            return data;
        },

        onSuccess: () => {
            toast.success("อัพเดตหลักฐานการชำระเงินสำเร็จ");
            queryClient.invalidateQueries({
                queryKey: [
                    "reservation",
                    "admin-pre-orders",
                    "pre-orders",
                    preOrderId,
                ],
            });
        },
        onError: (error) => {
            console.log("error", error);
            toast.error("อัพเดตหลักฐานการชำระเงินไม่สำเร็จ");
        },
    });
};
