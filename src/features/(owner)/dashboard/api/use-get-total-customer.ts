import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";
import { DateModeType } from "../types";

const api = client.api.owner.dashboard["customer-count"]["$get"];

export const useGetTotalCustomer = (
    startDate: string,
    endDate: string,
    mode: DateModeType
) => {
    const query = useQuery({
        queryKey: ["customer-count", startDate, endDate, mode],
        queryFn: async () => {
            const response = await api({
                query: {
                    startDate,
                    endDate,
                    mode,
                },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch customer count");
            }

            const data = await response.json();

            return data.result;
        },
        enabled: !!startDate && !!endDate && !!mode,
    });

    return query;
};
