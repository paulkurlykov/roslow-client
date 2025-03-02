import { BASE_URL } from '@/constans'
import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react'
import { RootState } from '../store'

console.log(BASE_URL);

export const baseQuery = fetchBaseQuery({

    baseUrl: `/api`,
    prepareHeaders: (headers, {getState}) => {
        const token = (getState() as RootState).userSliceReducer.token || localStorage.getItem('token')
        if(token) {
            headers.set("authorization", `Bearer ${token}`)
        }

        return headers;
    }
})

// const baseQueryWithRetry = retry(baseQuery, {maxRetries: 1});

// export const api = createApi({
//     reducerPath: "splitApi",
//     baseQuery: baseQueryWithRetry,
//     endpoints: () => ({}),
//     refetchOnMountOrArgChange: true
// })

// const baseQueryWithRetry = retry(baseQuery, {maxRetries: 1});

export const api = createApi({
    reducerPath: "splitApi",
    tagTypes: ["Users", "Posts", "Likes", "Comments", "UserById", "CurrentUser"],
    baseQuery,
    endpoints: () => ({}),
    refetchOnMountOrArgChange: true
})