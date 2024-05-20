import { useQuery} from "@tanstack/react-query";
import {getTags} from "@/components/Formula/tags.api";

export const useTags = () => {
    const {data, refetch} = useQuery({
        queryKey: ['tags'],
        queryFn: getTags
    })

    return {tags: data, refetch}
}