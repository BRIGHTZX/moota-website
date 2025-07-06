import { useParams } from "next/navigation";

export const useGetActiveInfoIdTableId = () => {
    const params = useParams();
    const activeInfoId = params.activeInfoId as string;
    return activeInfoId;
};
