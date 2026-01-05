import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_URL } from '../../../utils/data'

export const serviceApi = createApi({
    reducerPath: 'serviceApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${BASE_URL}/service/`,
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
            query: (params) => {
                const queryParams: any = {};
                
                if (params?.search) {
                    queryParams.search = params.search;
                }
                
                // Format categories as categories[0]=id1&categories[1]=id2
                if (params?.categories && Array.isArray(params.categories) && params.categories.length > 0) {
                    params.categories.forEach((categoryId: string, index: number) => {
                        queryParams[`categories[${index}]`] = categoryId;
                    });
                }
                
                return {
                    url: params?.id ? `get/${params?.id}` : `get`,
                    method: "GET",
                    params: queryParams
                };
            },
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