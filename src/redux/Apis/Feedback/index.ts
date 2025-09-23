import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_URL } from '../../../utils/data'

export const feedbackApi = createApi({
    reducerPath: 'feedbackApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${BASE_URL}/feedback/`
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