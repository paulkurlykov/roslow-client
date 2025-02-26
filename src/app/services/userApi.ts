import { api } from "./api";
import {User} from "../types"

const resourceName = "/users";

export const userApi = api.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<{accessToken: string, refreshToken: string, user: {id: string, email: string}}, {email: string; password: string}>({

            query: (userData) => {
                return {

                    url: `${resourceName}/login`,
                    method: "POST",
                    body: userData
                }
            }
        }),
        register: builder.mutation<
        {email: string; name: string; password: string},
        {email: string; name: string; password: string}
        >({
            query: (userData) => ({
                url: `${resourceName}/register`,
                method: "POST",
                body: userData
            })
        }),
        current: builder.query<User, void>({
            query: () => ({
                url: `${resourceName}/current`,
                method: "GET"
            }),
            providesTags: ["CurrentUser"]
        
        }),
        getUserById: builder.query<User, string>({
            query: (id) => ({
                url: `${resourceName}/user/${id}`,
                method: "GET"
            }),
            providesTags: ["UserById"]
        }),
        updateUser: builder.mutation<User, {userData: FormData, id: string}>({
            query: ({userData, id}) => ({
                url: `${resourceName}/user/${id}`,
                method: 'PATCH',
                body: userData
            }),
            invalidatesTags: ["UserById", "CurrentUser"]
        })
    })
    
})

export const {
    useLoginMutation,
    useRegisterMutation,
    useCurrentQuery,
    useLazyCurrentQuery,
    useGetUserByIdQuery,
    useLazyGetUserByIdQuery,
    useUpdateUserMutation
} = userApi;

export const {
    endpoints: {login, register, current, getUserById, updateUser}
} = userApi; 


