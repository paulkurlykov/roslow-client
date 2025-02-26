import { api } from "./api";
import { Post } from "../types";

const resourceName = "/posts";

export const postsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        createPost: builder.mutation<Post, {content: string}>({
            query: (postData) => ({
                url: `${resourceName}/`,
                method: "POST",
                body: postData
            }),
            invalidatesTags: ["Posts"]
        }),
        getPosts: builder.query<Post[], void>({
            query: () => ({
                url: `${resourceName}/`,
                method: "GET",
            }),
            providesTags: ["Posts"]
        }),
        getPostById: builder.query<Post, string>({
            query: (id) => ({
                url: `${resourceName}/${id}`,
                method: "GET",
            }),
            providesTags: ["Comments"]
        }),
        deletePost: builder.mutation<{message: string}, string>({
            query: (id) => ({
                url: `${resourceName}/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Posts"]
        })  
    })
})

export const {

    useCreatePostMutation,
    useGetPostsQuery,
    useLazyGetPostsQuery,
    useGetPostByIdQuery,
    useLazyGetPostByIdQuery,
    useDeletePostMutation

} = postsApi;

export const {
    endpoints: {createPost, getPosts, getPostById, deletePost}
} = postsApi; 