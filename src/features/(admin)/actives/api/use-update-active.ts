import { client } from '@/lib/rpc';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const api = client.api.admin.actives['update-active-info'][':activeId']['$put'];
type RequestType = InferRequestType<typeof api>;
type ResponseType = InferResponseType<typeof api>;

type UseUpdateActiveProps = {
    setIsOpen: (isOpen: boolean) => void;
};

export const useUpdateActive = ({ setIsOpen }: UseUpdateActiveProps) => {
    const router = useRouter();
    const queryClient = useQueryClient();
    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async ({ param, form }) => {
            const response = await api({
                form,
                param: {
                    activeId: param.activeId,
                },
            });

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
            setIsOpen(false);
        },
        onError: error => {
            if (error.message === 'Forbidden') {
                router.push('/forbidden');
            } else {
                toast.error('ยกเลิกโต๊ะไม่สำเร็จ');
            }

            setIsOpen(false);
        },
    });

    return mutation;
};
