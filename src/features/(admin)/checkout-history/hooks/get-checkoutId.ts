import { useParams } from "next/navigation";

export const useGetCheckoutId = () => {
    const params = useParams();
    return params.checkoutId as string;
};
