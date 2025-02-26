import { api } from "./api";
import { Comment } from "../types";

const resourceName = "/comments";

export const commentsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        createComment: builder.mutation<Comment, Partial<Comment>>({
            query: (newComment) => ({
                url: `${resourceName}/`,
                method: "POST",
                body: newComment,
            }),
            invalidatesTags: ["Comments"]
        }),
        deleteComment: builder.mutation<void, string>({
            query: (id) => ({
                url: `${resourceName}/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Comments"]
        }),
    }),
});

export const { useCreateCommentMutation, useDeleteCommentMutation } =
    commentsApi;

export const {
    endpoints: { createComment, deleteComment },
} = commentsApi;
