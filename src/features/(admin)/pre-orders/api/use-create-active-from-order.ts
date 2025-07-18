import { client } from '@/lib/rpc';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const api = client.api.admin['pre-orders']['create-active']['$post'];
type ResponseType = InferResponseType<typeof api>;
type RequestType = InferRequestType<typeof api>;

export const useCreateActiveFromOrder = ({
    setIsSuspenseLoading,
}: {
    setIsSuspenseLoading: (isSuspenseLoading: boolean) => void;
}) => {
    const router = useRouter();
    const queryClient = useQueryClient();
    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async ({ json }) => {
            const response = await api({
                json,
            });

            if (!response.ok) {
                if (response.status === 403) {
                    throw new Error('Forbidden');
                } else {
                    throw new Error('สร้างการเปิดโต๊ะไม่สำเร็จ');
                }
            }

            const data = await response.json();

            return data;
        },

        onSuccess: () => {
            toast.success('สร้างการเปิดโต๊ะสำเร็จ');
            queryClient.invalidateQueries({ queryKey: ['admin-pre-orders'] });
            queryClient.invalidateQueries({ queryKey: ['admin-actives'] });
            setIsSuspenseLoading(false);
        },
        onError: error => {
            if (error.message === 'Forbidden') {
                router.push('/forbidden');
            }
            toast.error('สร้างการเปิดโต๊ะไม่สำเร็จ');
        },
    });

    return mutation;
};
