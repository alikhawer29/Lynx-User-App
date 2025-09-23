import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://109.1.1.33:5000/lynx/v1/api/user/',
        prepareHeaders: (headers, { getState }) => {

            let token = getState()?.auth?.token

            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }

            headers.set('Accept', `application/json`)

            return headers

        }
    }),
    endpoints: (builder) => ({
        changePassword: builder.mutation({
            query: (body) => ({
                url: `change-password`,
                method: "POST",
                body
            }),
        }),
        editProfile: builder.mutation({
            query: (body) => ({
                url: `update`,
                method: "PUT",
                body
            }),
        }),
        getFavoriteServices: builder.query({
            query: () => ({
                url: `favorites`,
                method: "GET",
            }),
            keepUnusedDataFor: 0
        }),
        getSubscriptionPlans: builder.query({
            query: () => ({
                url: `plans`,
                method: "GET",
            }),
            keepUnusedDataFor: 0
        }),
        getSubscriptionLogs: builder.query({
            query: () => ({
                url: `subscription-logs`,
                method: "GET",
            }),
            keepUnusedDataFor: 0
        }),
        subscribe: builder.mutation({
            query: (body) => ({
                url: `payment`,
                method: "POST",
                body
            }),
        }),
        cancelSubscription: builder.mutation({
            query: (id) => ({
                url: `subscription/${id}/cancel`,
                method: "POST",
            }),
        }),
    }),
})

export const {
    useChangePasswordMutation,
    useEditProfileMutation,
    useGetFavoriteServicesQuery,
    useGetSubscriptionPlansQuery,
    useGetSubscriptionLogsQuery,
    useSubscribeMutation,
    useCancelSubscriptionMutation
} = userApi