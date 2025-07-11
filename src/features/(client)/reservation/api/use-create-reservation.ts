import { client } from "@/lib/rpc";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { InferRequestType, InferResponseType } from "hono";

const api = client.api.reservation["$post"];
type ResponseType = InferResponseType<typeof api, 200>;
type RequestType = InferRequestType<typeof api>;

export const useCreateReservation = () => {
    const router = useRouter();
    return useMutation<ResponseType, Error, RequestType>({
        mutationFn: async ({ json }) => {
            const response = await api({
                json: {
                    ...json,
                },
            });

            if (!response.ok) {
                throw new Error("Failed to create reservation");
            }

            const data = await response.json();

            return data;
        },
        onSuccess: (data) => {
            toast.success("Reservation created successfully");
            router.push(`/reservation/info/${data.result.id}`);
        },
        onError: (error) => {
            console.log(error);
            toast.error("Failed to create reservation");
        },
    });
};
