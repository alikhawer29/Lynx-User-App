import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_URL } from '../../../utils/data'

export const slotApi = createApi({
    reducerPath: 'slotApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${BASE_URL}/slot/`,
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
        getSlotsByDate: builder.query({
            query: (date: string) => ({
                url: `date/${date}`,
                method: "GET",
            }),
            keepUnusedDataFor: 0
        }),
    }),
})

export const {
    useGetSlotsByDateQuery,
    useLazyGetSlotsByDateQuery
} = slotApi

