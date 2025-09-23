import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const serviceApi = createApi({
    reducerPath: 'serviceApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://109.1.1.33:5000/lynx/v1/api/service/',
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
        getServices: builder.query({
            query: (params) => ({
                url: params?.id ? `get/${params?.id}` : `get`,
                method: "GET",
                params
            }),
            keepUnusedDataFor: 0
        }),
        handleFavorite: builder.mutation({
            query: (id) => ({
                url: `favorite/${id}`,
                method: "POST",
            }),
        }),
    }),
})

export const {
    useGetServicesQuery,
    useHandleFavoriteMutation
} = serviceApi