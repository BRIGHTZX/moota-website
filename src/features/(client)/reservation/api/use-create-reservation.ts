import { client } from "@/lib/rpc";
import { useMutation } from "@tanstack/react-query";
import { insertPreOrderSchemaType } from "../schema";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const api = client.api.reservation["$post"];

export const useCreateReservation = () => {
    const router = useRouter();
    return useMutation({
        mutationFn: async ({ form }: { form: insertPreOrderSchemaType }) => {
            const response = await api({
                form: {
                    ...form,
                    email: form.email ?? "",
                    adultNumber: form.adultNumber.toString(),
                    childNumber: form.childNumber.toString(),
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
