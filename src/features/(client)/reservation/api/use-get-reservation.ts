import { useQuery } from "@tanstack/react-query";

const;

export const useGetReservation = (preOrderId: string) => {
    return useQuery({
        queryKey: ["reservation", preOrderId],
        queryFn: () => getReservation(),
    });
};
