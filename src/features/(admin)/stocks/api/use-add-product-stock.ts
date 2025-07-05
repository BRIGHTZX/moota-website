import { client } from "@/lib/rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

const api = client.api.admin.stocks["$post"];
type RequestType = InferRequestType<typeof api>;
type ResponseType = InferResponseType<typeof api>;

export const useAddProductStock = ({
    setIsOpen,
}: {
    setIsOpen: (isOpen: boolean) => void;
}) => {
    const queryClient = useQueryClient();
    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async ({ form }) => {
            const response = await api({
                form,
            });

            if (!response.ok) {
                throw new Error("Failed to add product stock");
            }

            const data = await response.json();

            return data;
        },
        onSuccess: () => {
            toast.success("เพิ่มสินค้าเรียบร้อย");
            queryClient.invalidateQueries({ queryKey: ["products-stock"] });
            setIsOpen(false);
        },
        onError: (error) => {
            toast.error("เพิ่มสินค้าไม่สำเร็จ");
            console.log(error);
        },
    });

    return mutation;
};
