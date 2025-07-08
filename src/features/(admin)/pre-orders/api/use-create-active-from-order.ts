import { client } from "@/lib/rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

const api = client.api.admin["pre-orders"]["create-active"]["$post"];
type ResponseType = InferResponseType<typeof api>;
type RequestType = InferRequestType<typeof api>;

export const useCreateActiveFromOrder = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async ({ json }) => {
            const response = await api({
                json,
            });

            if (!response.ok) {
                throw new Error("Failed to create active");
            }

            const data = await response.json();

            return data;
        },

        onSuccess: () => {
            toast.success("สร้างการเปิดโต๊ะสำkเร็จ");
            queryClient.invalidateQueries({ queryKey: ["admin-pre-orders"] });
            queryClient.invalidateQueries({ queryKey: ["admin-actives"] });
        },
        onError: (error) => {
            console.log("error", error.message);
            toast.error("สร้างการเปิดโต๊ะไม่สำเร็จ");
        },
    });

    return mutation;
};
