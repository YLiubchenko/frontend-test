import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {getTags, ITagItem} from "@/components/Formula/tags.api";

export const useTags = () => {
    const {data, refetch} = useQuery({
        queryKey: ['tags'],
        queryFn: getTags
    })

    return {tags: data, refetch}
}

export const useRemoveSelectedPosts = (onSuccess?: Function) => {
    const queryClient = useQueryClient();

    const {mutate: remove} = useMutation({
        // mutationFn: removeSelectedPosts,
        onSuccess: (ids: number[]) => {
            //Updating posts state
            queryClient.setQueryData(["posts"], (prev: ITagItem[]) => {
                return prev.filter(x => !ids.includes(Number(x.id)))
            })
            //Trigger side effects
            onSuccess?.()
        },
    });

    return {remove}
}