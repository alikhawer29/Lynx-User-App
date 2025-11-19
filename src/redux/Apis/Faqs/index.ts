import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../../utils/data';

export const faqsApi = createApi({
  reducerPath: 'faqsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/faq/user/`,
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
    getFAQs: builder.query({
      query: () => ({
        url: '', // This will hit {{BASE_URL}}/faq/user
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetFAQsQuery, useLazyGetFAQsQuery } = faqsApi;
