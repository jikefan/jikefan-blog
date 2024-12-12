import { errorToast, successToast } from "@/components/ui/toast";
import { createPost } from "../actions/index";
import { useRequest } from "ahooks";

export const useCreatePost = () => {
    return useRequest(createPost, {
        manual: true,
        loadingDelay: 300,
        onSuccess: () => {
            successToast("Post created successfully!")
        },
        onError: (error) => {
            errorToast(`Post creation failed: ${error.message}`)
        }
    })
}