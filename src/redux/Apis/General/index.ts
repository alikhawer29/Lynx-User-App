import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const generalApi = createApi({
    reducerPath: 'generalApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://109.1.1.33:5000/lynx/v1/api/general/',
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