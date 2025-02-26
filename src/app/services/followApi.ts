import { api } from "./api";
import { Follows } from "../types";

const resourceName = "/follow";

export const followsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        followUser: builder.mutation<Follows, {followingId: string}>({
            query: (body) => ({
                url: `${resourceName}/`,
                method: "POST",
                body,
            }),
            invalidatesTags: ["UserById"]
        }),
        unFollowUser: builder.mutation<void, string>({
            query: (id) => ({
                url: `${resourceName}/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["UserById"]
        }),
    }),
});

export const {useFollowUserMutation, useUnFollowUserMutation} =
    followsApi;

export const {
    endpoints: { followUser, unFollowUser },
} = followsApi;


