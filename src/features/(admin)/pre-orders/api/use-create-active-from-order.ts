import { client } from "@/lib/rpc";
import { useMutation } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

const api = client.api.admin["pre-orders"]["create-active"]["$post"];
type ResponseType = InferResponseType<typeof api>;
type RequestType = InferRequestType<typeof api>;

export const useCreateActiveFromOrder = () => {
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
    });

    return mutation;
};
