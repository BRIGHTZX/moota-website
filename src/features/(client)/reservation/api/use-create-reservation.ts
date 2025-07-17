import { client } from '@/lib/rpc';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { InferRequestType, InferResponseType } from 'hono';

const api = client.api.reservation['$post'];
type ResponseType = InferResponseType<typeof api, 200>;
type RequestType = InferRequestType<typeof api>;

export const useCreateReservation = () => {
    const router = useRouter();
    const queryClient = useQueryClient();
    return useMutation<ResponseType, Error, RequestType>({
        mutationFn: async ({ json }) => {
            const response = await api({
                json: {
                    ...json,
                },
            });

            if (!response.ok) {
                throw new Error('การสร้างการจองล้มเหลว');
            }

            const data = await response.json();

            return data;
        },
        onSuccess: data => {
            toast.success('สร้างการจองสำเร็จ');
            router.push(`/reservation/info/${data.result.id}`);
            queryClient.invalidateQueries({
                queryKey: ['pre-orders'],
            });
            queryClient.invalidateQueries({
                queryKey: ['admin-pre-orders'],
            });
            queryClient.invalidateQueries({
                queryKey: ['reservation'],
            });
        },
        onError: error => {
            console.log(error);
            toast.error('การสร้างการจองล้มเหลว');
        },
    });
};
