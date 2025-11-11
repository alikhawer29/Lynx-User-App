import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../../utils/data';

export const bookingApi = createApi({
  reducerPath: 'bookingApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/booking/`,
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
    createBooking: builder.mutation({
      query: body => ({
        url: `create`,
        method: 'POST',
        body,
      }),
    }),
    createPaymentIntent: builder.mutation({
      query: body => ({
        url: `payment/create`,
        method: 'POST',
        body,
      }),
    }),
    updatePaymentStatus: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `payment/update/${id}`,
        method: 'POST',
        body,
      }),
    }),
    getBookings: builder.query({
      query: params => ({
        url: `get`,
        method: 'GET',
        params,
      }),
      keepUnusedDataFor: 0,
    }),
  }),
});

export const {
  useCreateBookingMutation,
  useCreatePaymentIntentMutation,
  useUpdatePaymentStatusMutation,
  useGetBookingsQuery,
  useLazyGetBookingsQuery,
} = bookingApi;
