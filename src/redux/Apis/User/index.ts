import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../../utils/data';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/user/`,
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
    changePassword: builder.mutation({
      query: body => ({
        url: `change-password`,
        method: 'POST',
        body,
      }),
    }),
    editProfile: builder.mutation({
      query: body => ({
        url: `update`,
        method: 'PUT',
        // Do not force Content-Type — FormData needs multipart boundary from fetch
        body,
      }),
    }),
    getFavoriteServices: builder.query({
      query: params => ({
        url: `favorites`,
        method: 'GET',
        params,
      }),
      keepUnusedDataFor: 0,
    }),
    getSubscriptionPlans: builder.query({
      query: () => ({
        url: `plans`,
        method: 'GET',
      }),
      keepUnusedDataFor: 0,
    }),
    getSubscriptionLogs: builder.query({
      query: () => ({
        url: `subscription-logs`,
        method: 'GET',
      }),
      keepUnusedDataFor: 0,
    }),
    subscribe: builder.mutation({
      query: body => ({
        url: `payment`,
        method: 'POST',
        body,
      }),
    }),
    cancelSubscription: builder.mutation({
      query: id => ({
        url: `subscription/${id}/cancel`,
        method: 'POST',
      }),
    }),
  }),
});

export const {
  useChangePasswordMutation,
  useEditProfileMutation,
  useGetFavoriteServicesQuery,
  useGetSubscriptionPlansQuery,
  useGetSubscriptionLogsQuery,
  useSubscribeMutation,
  useCancelSubscriptionMutation,
} = userApi;
