import { client } from '@/lib/rpc';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const api = client.api.admin.tables['open-table']['$post'];
type ResponstType = InferResponseType<typeof api>;
type RequestType = InferRequestType<typeof api>;

export const useCreateAdminTables = () => {
    const router = useRouter();
    const queryClient = useQueryClient();
    const mutation = useMutation<ResponstType, Error, RequestType>({
        mutationFn: async ({ json }) => {
            const response = await api({
                json,
            });

            if (!response.ok) {
                if (response.status === 403) {
                    throw new Error('Forbidden');
                } else {
                    throw new Error('เปิดโต๊ะไม่สำเร็จ');
                }
            }

            const data = response.json();

            return data;
        },
        onSuccess: () => {
            toast.success('เปิดโต๊ะสำเร็จ');
            queryClient.invalidateQueries({ queryKey: ['admin-tables'] });
        },
        onError: error => {
            if (error.message === 'Forbidden') {
                router.push('/forbidden');
            }
            toast.error('เปิดโต๊ะไม่สำเร็จ');
        },
    });

    return mutation;
};
