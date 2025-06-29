import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";

const api = client.api.reservation[":preOrderId"]["$get"];

export const useGetReservation = (preOrderId: string) => {
    return useQuery({
        queryKey: ["reservation", preOrderId],
        queryFn: async () => {
            const response = await api({
                param: {
                    preOrderId,
                },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch reservation");
            }

            const data = await response.json();

            return data;
        },
    });
};
