import { client } from "@/lib/rpc";
import { useMutation } from "@tanstack/react-query";

const api = client.api.admin.orders.create;

export const useCreateActiveFromOrder = () => {
    return useMutation({
        mutationFn: async (orderId: string) => {
            const response = await fetch(`/api/orders/${orderId}`);
        },
    });
};
