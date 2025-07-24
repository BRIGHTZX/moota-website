import { client } from '@/lib/rpc';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const api = client.api.admin.actives['cancel-active']['$post'];
type RequestType = InferRequestType<typeof api>;
type ResponseType = InferResponseType<typeof api>;

export const useCancelActive = () => {
    const router = useRouter();
    const queryClient = useQueryClient();
    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async ({ json }) => {
            const response = await api({ json });

            if (!response.ok) {
                if (response.status === 403) {
                    throw new Error('Forbidden');
                } else {
                    throw new Error('Failed to cancel active');
                }
            }

            const data = response.json();

            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-actives'] });
            queryClient.invalidateQueries({ queryKey: ['admin-tables'] });
            toast.success('ยกเลิกโต๊ะสำเร็จ');
        },
        onError: error => {
            if (error.message === 'Forbidden') {
                router.push('/forbidden');
            } else {
                toast.error('ยกเลิกโต๊ะไม่สำเร็จ');
            }
        },
    });

    return mutation;
};
