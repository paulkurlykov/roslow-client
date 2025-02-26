import { api } from "./api";
import { Like } from "../types";

const resourceName = "/likes";

export const likesApi = api.injectEndpoints({
    endpoints: (builder) => ({
        likePost: builder.mutation<Like, {postId: string}>({
            query: (newLike) => ({
                url: `${resourceName}/`,
                method: "POST",
                body: newLike,
            }),
            invalidatesTags: ["Posts"]
        }),
        unlikePost: builder.mutation<void, string>({
            query: (id) => ({
                url: `${resourceName}/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Posts"]
        }),
    }),
});

export const { useLikePostMutation, useUnlikePostMutation } =
    likesApi;

export const {
    endpoints: { likePost, unlikePost },
} = likesApi;
