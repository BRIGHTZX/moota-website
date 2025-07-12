import { client } from "@/lib/rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

const api = client.api.admin["import-export"][":productId"]["$post"];
type RequestType = InferRequestType<typeof api>;
type ResponseType = InferResponseType<typeof api>;

export const useAddImportExportProduct = ({
    setIsOpen,
}: {
    setIsOpen: (isOpen: boolean) => void;
}) => {
    const queryClient = useQueryClient();
    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async ({ param, json }) => {
            const response = await api({
                param: {
                    productId: param.productId,
                },
                json,
            });

            if (!response.ok) {
                throw new Error("Failed to add import/export product");
            }

            const data = await response.json();

            return data;
        },
        onSuccess: () => {
            toast.success("เพิ่มสินค้าเรียบร้อย");
            queryClient.invalidateQueries({
                queryKey: ["importExportProduct"],
            });
            queryClient.invalidateQueries({
                queryKey: ["products-stock"],
            });
            queryClient.invalidateQueries({
                queryKey: ["limit-notification"],
            });
            setIsOpen(false);
        },
        onError: (error) => {
            toast.error("เพิ่มสินค้าไม่สำเร็จ", {
                description: error.message,
            });
            console.log(error);
        },
    });

    return mutation;
};
