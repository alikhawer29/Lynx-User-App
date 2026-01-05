import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../../utils/data';

export const categoryApi = createApi({
  reducerPath: 'categoryApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/category/`,
    prepareHeaders: (headers, { getState }) => {
      let token = getState()?.auth?.token;

      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }

      headers.set('Accept', `application/json`);

      return headers;
    },
  }),
  endpoints: builder => ({
    getAllActiveCategories: builder.query({
      query: () => ({
        url: 'get-all-active',
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetAllActiveCategoriesQuery } = categoryApi;

