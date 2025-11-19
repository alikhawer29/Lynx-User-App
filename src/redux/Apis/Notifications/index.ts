// Notifications.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  Notification,
  NotificationMarkResponse,
  NotificationResponse,
  NotificationStatus,
} from '../../../types/notifications';
import { BASE_URL } from '../../../utils/data';

export const notificationApi = createApi({
  reducerPath: 'notificationApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/`,
    prepareHeaders: (headers, { getState }) => {
      let token = getState()?.auth?.token;

      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }

      headers.set('Accept', `application/json`);

      return headers;
    },
  }),
  tagTypes: ['Notifications'],
  endpoints: builder => ({
    getNotifications: builder.query<NotificationResponse, NotificationStatus>({
      query: (status = 'all') => `/notification/user?status=${status}`,
      providesTags: ['Notifications'],
    }),

    markNotificationAsRead: builder.mutation<NotificationMarkResponse, string>({
      query: notificationId => ({
        url: `/notification/user/read/${notificationId}`,
        method: 'PATCH',
      }),
      invalidatesTags: ['Notifications'],
    }),

    markAllNotificationsAsRead: builder.mutation<
      NotificationMarkResponse,
      void
    >({
      query: () => ({
        url: '/notification/user/read-all',
        method: 'PATCH',
      }),
      invalidatesTags: ['Notifications'],
    }),
  }),
});

export const {
  useGetNotificationsQuery,
  useMarkNotificationAsReadMutation,
  useMarkAllNotificationsAsReadMutation,
} = notificationApi;
