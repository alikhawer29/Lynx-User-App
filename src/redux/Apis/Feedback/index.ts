import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const feedbackApi = createApi({
    reducerPath: 'feedbackApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://109.1.1.33:5000/lynx/v1/api/feedback/',
    }),
    endpoints: (builder) => ({
        createFeedback: builder.mutation({
            query: (body) => ({
                url: `create`,
                method: "POST",
                body
            }),
        }),
    }),
})

export const {
    useCreateFeedbackMutation
} = feedbackApi