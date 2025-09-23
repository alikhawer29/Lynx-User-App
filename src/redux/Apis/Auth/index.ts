import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../../utils/data';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${BASE_URL}/auth/`
    }),
    endpoints: (builder) => ({
        signup: builder.mutation({
            query: (body) => ({
                url: `signup`,
                method: "POST",
                body
            }),

        }),
        login: builder.mutation({
            query: (body) => ({
                url: `login`,
                method: "POST",
                body
            }),
        }),
        forgotPassword: builder.mutation({
            query: (body) => ({
                url: `forget-password`,
                method: "POST",
                body
            }),
            transformResponse: (response: any, meta: any) => {
                meta.show_success = true
                return response;
            }
        }),
        verify: builder.mutation({
            query: (body) => ({
                url: `verify-otp`,
                method: "POST",
                body
            }),
        }),
        setPassword: builder.mutation({
            query: (body) => ({
                url: `reset-password`,
                method: "POST",
                body
            }),
        }),

    }),
})

export const {
    useLoginMutation,
    useSignupMutation,
    useForgotPasswordMutation,
    useVerifyMutation,
    useSetPasswordMutation,
} = authApi