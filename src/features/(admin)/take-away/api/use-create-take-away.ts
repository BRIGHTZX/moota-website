import { client } from '@/lib/rpc';
import { useMutation } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const api = client.api.admin['take-away']['create-take-away']['$post'];
type ResponseType = InferResponseType<typeof api>;
type RequestType = InferRequestType<typeof api>;

export const useCreateTakeAway = () => {
    const router = useRouter();
    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async ({ form }) => {
            const response = await api({
                form,
            });

            if (!response.ok) {
                if (response.status === 403) {
                    throw new Error('Forbidden');
                } else {
                    throw new Error('สร้างการสั่งซื้อกลับบ้านไม่สำเร็จ');
                }
            }

            const data = response.json();

            return data;
        },
        onSuccess: () => {
            toast.success('สร้างการสั่งซื้อกลับบ้านสำเร็จ');
        },
        onError: error => {
            if (error.message === 'Forbidden') {
                router.push('/forbidden');
            }
            toast.error('สร้างการสั่งซื้อกลับบ้านไม่สำเร็จ');
        },
    });

    return mutation;
};
