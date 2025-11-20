import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../../utils/data';

export const chatApi = createApi({
  reducerPath: 'chatApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/chat/`,
    prepareHeaders: (headers, { getState }) => {
      let token = getState()?.auth?.token;

      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }

      headers.set('Accept', `application/json`);

      return headers;
    },
  }),
  tagTypes: ['Chats', 'Messages'],
  endpoints: builder => ({
    // Get user chats (support or appointment)
    getUserChats: builder.query({
      query: ({ page = 1, per_page = 20, chat_type = 'support' }) => ({
        url: `user-chats`,
        method: 'GET',
        params: { page, per_page, chat_type },
      }),
      providesTags: ['Chats'],
      keepUnusedDataFor: 0,
    }),

    // Get messages for a specific chat room
    getMessages: builder.query({
      query: ({ chatRoomId, page = 1, per_page = 50 }) => ({
        url: `messages/${chatRoomId}`,
        method: 'GET',
        params: { page, per_page },
      }),
      providesTags: (result, error, { chatRoomId }) => [
        { type: 'Messages', id: chatRoomId },
      ],
      keepUnusedDataFor: 0,
    }),

    // Create or get support chat
    createSupportChat: builder.mutation({
      query: () => ({
        url: 'support',
        method: 'POST',
      }),
      invalidatesTags: ['Chats'],
    }),

    // Create or get appointment chat
    createAppointmentChat: builder.mutation({
      query: (body: { booking_id: string }) => ({
        url: 'appointment',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Chats'],
    }),

    // Send message
    sendMessage: builder.mutation({
      query: ({
        formData,
        chatRoomId,
      }: {
        formData: FormData;
        chatRoomId: string;
      }) => ({
        url: 'messages/send',
        method: 'POST',
        body: formData,
        formData: true,
      }),
      invalidatesTags: (result, error, { chatRoomId }) => {
        return ['Chats', { type: 'Messages', id: chatRoomId }];
      },
    }),

    // Mark messages as read
    markMessagesAsRead: builder.mutation({
      query: (chatRoomId: string) => ({
        url: `messages/chat/${chatRoomId}/read-all`,
        method: 'PUT',
      }),
      invalidatesTags: (result, error, chatRoomId) => [
        'Chats',
        { type: 'Messages', id: chatRoomId },
      ],
    }),
  }),
});

export const {
  useGetUserChatsQuery,
  useLazyGetUserChatsQuery,
  useGetMessagesQuery,
  useLazyGetMessagesQuery,
  useCreateSupportChatMutation,
  useCreateAppointmentChatMutation,
  useSendMessageMutation,
  useMarkMessagesAsReadMutation,
} = chatApi;
