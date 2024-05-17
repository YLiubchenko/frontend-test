import {create} from "zustand";
import {ITagItem} from "@/components/Formula/tags.api";

interface TagsStore {
    addedTags: ITagItem[],
    actions: TagsStoreActions
}

interface TagsStoreActions {
    addTags: (tag: ITagItem) => void
    cleanSelectedTags: () => void
}

const useTagsStore = create<TagsStore>((set, get) => ({
    addedTags: [],
    actions: {
        addTags: (tag: ITagItem) => {
            const {addedTags} = get()

            set({addedTags: [...addedTags, tag ]})
        },
        cleanSelectedTags: () => set({addedTags: []})
    }
}))

export const useSelectedTagsIds = () => useTagsStore((state) => state.addedTags)
export const useTagsStoreActions = () => useTagsStore((state) => state.actions)
