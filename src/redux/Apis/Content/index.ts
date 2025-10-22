import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_URL } from '../../../utils/data'

export const contentApi = createApi({
    reducerPath: 'contentApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${BASE_URL}/content/`,
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
        getContents: builder.query({
            query: (params) => ({
                url: params?.id ? `get/${params?.id}` : `get`,
                method: "GET",
                params
            }),
            keepUnusedDataFor: 0
        }),
    }),
})

export const {
    useGetContentsQuery,
} = contentApi