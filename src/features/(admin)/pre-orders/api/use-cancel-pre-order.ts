import { client } from '@/lib/rpc';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const api = client.api.admin['pre-orders']['cancel-pre-order']['$patch'];
type RequestType = InferRequestType<typeof api>;
type ResponseType = InferResponseType<typeof api>;

type UseCancelPreOrderProps = {
    setIsSuspenseLoading: (isSuspenseLoading: boolean) => void;
};

export const useCancelPreOrder = ({
    setIsSuspenseLoading,
}: UseCancelPreOrderProps) => {
    const router = useRouter();
    const queryClient = useQueryClient();
    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async ({ json }) => {
            const response = await api({ json });

            if (!response.ok) {
                if (response.status === 403) {
                    throw new Error('Forbidden');
                } else {
                    throw new Error('ยกเลิกออเดอร์ไม่สำเร็จ');
                }
            }

            const data = response.json();

            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-pre-orders'] });
            toast.success('ยกเลิกออเดอร์สำเร็จ');
            setIsSuspenseLoading(false);
        },
        onError: error => {
            if (error.message === 'Forbidden') {
                router.push('/forbidden');
            } else {
                toast.error('ยกเลิกออเดอร์ไม่สำเร็จ');
            }
        },
    });

    return mutation;
};
