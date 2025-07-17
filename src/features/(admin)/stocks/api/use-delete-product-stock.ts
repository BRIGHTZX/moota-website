import { client } from '@/lib/rpc';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';
import { toast } from 'sonner';

const api = client.api.admin.stocks['delete-product'][':productId']['$delete'];
type RequestType = InferRequestType<typeof api>;
type ResponseType = InferResponseType<typeof api>;

export const useDeleteProduct = ({
    setIsOpen,
}: {
    setIsOpen: (isOpen: boolean) => void;
}) => {
    const queryClient = useQueryClient();
    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async ({ param }) => {
            const response = await api({
                param: {
                    productId: param.productId,
                },
            });

            if (!response.ok) {
                throw new Error('ลบสินค้าไม่สำเร็จ');
            }

            const data = await response.json();

            return data;
        },
        onSuccess: () => {
            toast.success('ลบสินค้าเรียบร้อย');
            queryClient.invalidateQueries({ queryKey: ['products-stock'] });
            setIsOpen(false);
        },
        onError: error => {
            toast.error('ลบสินค้าไม่สำเร็จ');
            console.log(error);
        },
    });

    return mutation;
};
