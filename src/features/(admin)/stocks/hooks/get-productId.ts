import { useParams } from "next/navigation";

export const useGetProductId = () => {
    const params = useParams();
    const productId = params.productId as string;
    return productId;
};
