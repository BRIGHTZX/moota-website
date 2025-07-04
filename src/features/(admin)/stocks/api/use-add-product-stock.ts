import { client } from "@/lib/rpc";
import { useMutation } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

const api = client.api.admin.stocks["$post"];
type RequestType = InferRequestType<typeof api>;
type ResponseType = InferResponseType<typeof api>;

export const useAddProductStock = () => {
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
    });

    return mutation;
};
