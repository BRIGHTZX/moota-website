import { useParams } from "next/navigation";

export const useGetActiveId = () => {
    const params = useParams();
    const activeId = params.activeId as string;
    return activeId;
};
