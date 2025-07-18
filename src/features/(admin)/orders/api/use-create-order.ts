import { client } from '@/lib/rpc';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';
import { toast } from 'sonner';
import { OrderItem } from '../types';
import { useRouter } from 'next/navigation';

const api = client.api.admin.orders['create-order']['$post'];
type RequestType = InferRequestType<typeof api>;
type ResponseType = InferResponseType<typeof api>;

type CreateOrderProps = {
    activeInfoId: string;
    setOrderList: (orderList: OrderItem[]) => void;
};

export const useCreateOrder = ({
    activeInfoId,
    setOrderList,
}: CreateOrderProps) => {
    const router = useRouter();
    const queryClient = useQueryClient();
    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async ({ json }) => {
            const response = await api({ json });

            if (!response.ok) {
                if (response.status === 403) {
                    throw new Error('Forbidden');
                } else {
                    throw new Error('สร้างรายการสั่งซื้อล้มเหลว');
                }
            }

            const data = await response.json();

            return data;
        },
        onSuccess: () => {
            toast.success('สร้างรายการสั่งซื้อสำเร็จ');
            setOrderList([]);
            queryClient.invalidateQueries({
                queryKey: ['product-drink-list'],
            });
            queryClient.invalidateQueries({
                queryKey: ['order-history', activeInfoId],
            });
        },
        onError: error => {
            if (error.message === 'Forbidden') {
                router.push('/forbidden');
            }
            toast.error('สร้างรายการสั่งซื้อล้มเหลว');
        },
    });

    return mutation;
};
