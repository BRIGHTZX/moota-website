import { client } from '@/lib/rpc';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const api = client.api.admin.checkout['checkout'][':activeId']['$post'];
type RequestType = InferRequestType<typeof api>;
type ResponseType = InferResponseType<typeof api, 200>;

type CreateCheckoutType = {
    activeId: string;
    activeInfoId: string[];
};

export const useCreateCheckout = ({
    activeId,
    activeInfoId,
}: CreateCheckoutType) => {
    const router = useRouter();
    const queryClient = useQueryClient();
    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async ({ param, json }) => {
            const response = await api({
                json,
                param: {
                    activeId: param.activeId,
                },
            });

            if (!response.ok) {
                if (response.status === 403) {
                    throw new Error('Forbidden');
                } else {
                    throw new Error('สร้างรายการชำระเงินไม่เสำเร็จ');
                }
            }

            const data = await response.json();

            return data;
        },

        onSuccess: data => {
            queryClient.invalidateQueries({
                queryKey: ['checkout-info', activeId],
            });
            queryClient.invalidateQueries({
                queryKey: ['checkout-order-lists', activeInfoId],
            });
            toast.success('สร้างรายการชำระเงินสำเร็จ');
            if (data.activeSuccess) {
                router.push(`/admin/checkout-history/${data.checkoutId}`);
            }
        },
        onError: error => {
            if (error.message === 'Forbidden') {
                router.push('/forbidden');
            }
            toast.error('สร้างรายการชำระเงินไม่สำเร็จ');
        },
    });

    return mutation;
};
