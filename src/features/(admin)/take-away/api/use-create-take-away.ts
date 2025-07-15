import { client } from '@/lib/rpc';
import { useMutation } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';
import { toast } from 'sonner';

const api = client.api.admin['take-away']['create-take-away']['$post'];
type ResponseType = InferResponseType<typeof api>;
type RequestType = InferRequestType<typeof api>;

export const useCreateTakeAway = () => {
    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async ({ form }) => {
            const response = await api({
                form,
            });

            if (!response.ok) {
                throw Error('สร้างการสั่งซื้อกลับบ้านไม่สำเร็จ');
            }

            const data = response.json();

            return data;
        },
        onSuccess: () => {
            toast.success('สร้างการสั่งซื้อกลับบ้านสำเร็จ');
        },
        onError: error => {
            console.log(error);
            toast.error('สร้างการสั่งซื้อกลับบ้านไม่สำเร็จ');
        },
    });

    return mutation;
};
