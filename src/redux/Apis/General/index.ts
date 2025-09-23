import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_URL } from '../../../utils/data'

export const generalApi = createApi({
    reducerPath: 'generalApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${BASE_URL}/general/`
    }),
    endpoints: (builder) => ({
        getData: builder.query({
            query: () => ({
                url: `get-data`,
                method: "GET",
            }),
        }),
    }),
})

export const {
    useGetDataQuery
} = generalApi