import { client } from '@/lib/rpc';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const api = client.api.admin.stocks[':productId']['$put'];
type RequestType = InferRequestType<typeof api>;
type ResponseType = InferResponseType<typeof api>;

export const useUpdateProductStock = ({
    productId,
    setIsEditing,
}: {
    productId: string;
    setIsEditing: (isEditing: boolean) => void;
}) => {
    const router = useRouter();
    const queryClient = useQueryClient();
    return useMutation<ResponseType, Error, RequestType>({
        mutationFn: async ({ param, form }) => {
            const response = await api({
                param,
                form,
            });

            if (!response.ok) {
                if (response.status === 403) {
                    throw new Error('Forbidden');
                } else {
                    throw new Error('อัพเดตสินค้าไม่สำเร็จ');
                }
            }

            const data = await response.json();

            return data;
        },
        onSuccess: () => {
            toast.success('อัพเดตสินค้าเรียบร้อย');
            setIsEditing(false);
            queryClient.invalidateQueries({
                queryKey: ['product-stock', productId],
            });
            queryClient.invalidateQueries({
                queryKey: ['products-stock'],
            });
        },
        onError: error => {
            if (error.message === 'Forbidden') {
                router.push('/forbidden');
            }
            toast.error('อัพเดตสินค้าไม่สำเร็จ');
        },
    });
};
