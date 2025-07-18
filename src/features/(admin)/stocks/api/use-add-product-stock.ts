import { client } from '@/lib/rpc';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const api = client.api.admin.stocks['$post'];
type RequestType = InferRequestType<typeof api>;
type ResponseType = InferResponseType<typeof api>;

export const useAddProductStock = ({
    setIsOpen,
}: {
    setIsOpen: (isOpen: boolean) => void;
}) => {
    const router = useRouter();
    const queryClient = useQueryClient();
    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async ({ form }) => {
            const response = await api({
                form,
            });

            if (!response.ok) {
                if (response.status === 403) {
                    throw new Error('Forbidden');
                } else {
                    throw new Error('เพิ่มสินค้าไม่สำเร็จ');
                }
            }

            const data = await response.json();

            return data;
        },
        onSuccess: () => {
            toast.success('เพิ่มสินค้าเรียบร้อย');
            queryClient.invalidateQueries({ queryKey: ['products-stock'] });
            setIsOpen(false);
        },
        onError: error => {
            if (error.message === 'Forbidden') {
                router.push('/forbidden');
            }
            toast.error('เพิ่มสินค้าไม่สำเร็จ');
        },
    });

    return mutation;
};
