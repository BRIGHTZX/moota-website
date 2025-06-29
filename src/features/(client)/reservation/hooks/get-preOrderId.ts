import { useParams } from "next/navigation";

export const useGetPreOrderId = () => {
    const params = useParams();
    const preOrderId = params.preOrderId as string;
    return preOrderId;
};
