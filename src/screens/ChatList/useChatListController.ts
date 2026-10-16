import { useState, useEffect, useMemo } from 'react';
import {
  useGetUserChatsQuery,
  useCreateSupportChatMutation,
} from '../../redux/Apis/Chat';
import { useAppDispatch } from '../../hooks';
import {
  setTotalUnreadCount,
} from '../../redux/Slices/ChatSlice';
import socketService from '../../services/socket';
import { ChatRoom } from '../../types/chat';
import {
  getChatBookingDisplayId,
  getChatBookingStatus,
} from '../../utils/chat';
import { navigate } from '../../utils/navigation';
import { ROUTES } from '../../utils/routes';

type FilterType = 'all' | 'support' | 'appointment';

const useChatListController = () => {
  const dispatch = useAppDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<FilterType>('all');
  const [page, setPage] = useState(1);

  // Fetch support chats
  const {
    data: supportChatsData,
    isLoading: isSupportLoading,
    refetch: refetchSupport,
  } = useGetUserChatsQuery({ page, per_page: 20, chat_type: 'support' });

  // Fetch appointment chats
  const {
    data: appointmentChatsData,
    isLoading: isAppointmentLoading,
    refetch: refetchAppointment,
  } = useGetUserChatsQuery({ page, per_page: 20, chat_type: 'appointment' });

  const [createSupportChat] = useCreateSupportChatMutation();

  // Combine chats with support chat always first
  const chats = useMemo(() => {
    const supportChats = supportChatsData?.data || [];
    const appointmentChats = appointmentChatsData?.data || [];

    // Support chat should always be first
    return [...supportChats, ...appointmentChats];
  }, [supportChatsData, appointmentChatsData]);

  const isLoading = isSupportLoading || isAppointmentLoading;
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Filter chats based on search query
  const filteredChats = useMemo(() => {
    let filtered = chats;

    // Apply filter
    if (filter === 'support') {
      filtered = filtered.filter(chat => chat.chat_type === 'support');
    } else if (filter === 'appointment') {
      filtered = filtered.filter(chat => chat.chat_type === 'appointment');
    }

    // Apply search (name, last message, or booking id) — keep inactive/past chats
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(chat => {
        const otherUser = chat.other_user || chat.other_user_id;
        const displayName =
          chat.chat_type === 'support'
            ? 'Customer Support'
            : `${otherUser?.first_name || ''} ${
                otherUser?.last_name || ''
              }`.trim();
        const bookingId = getChatBookingDisplayId(chat)?.toLowerCase() || '';

        return (
          displayName.toLowerCase().includes(query) ||
          chat.last_message_text?.toLowerCase().includes(query) ||
          bookingId.includes(query)
        );
      });
    }

    return filtered;
  }, [chats, filter, searchQuery]);

  const onRefresh = async () => {
    setIsRefreshing(true);
    await Promise.all([refetchSupport(), refetchAppointment()]);
    setIsRefreshing(false);
  };

  const onChatPress = (chat: ChatRoom) => {
    const bookingStatus = getChatBookingStatus(chat);
    navigate(ROUTES.CHAT_ROOM, {
      chatRoom: chat,
      bookingId: getChatBookingDisplayId(chat) || undefined,
      bookingStatus: bookingStatus || undefined,
    });
  };

  // Create support chat if it doesn't exist
  useEffect(() => {
    const supportChats = supportChatsData?.data || [];
    if (supportChats.length === 0 && !isSupportLoading) {
      createSupportChat({});
    }
  }, [supportChatsData, isSupportLoading]);

  // Sync accurate total unread count to Redux whenever chat data changes
  useEffect(() => {
    const total = chats.reduce(
      (sum: number, chat: ChatRoom) => sum + (chat.my_unread_count || 0),
      0,
    );
    dispatch(setTotalUnreadCount(total));
  }, [chats, dispatch]);

  // Socket: refetch chat list when a new message arrives in a room the user is NOT currently in
  // The server emits new_message_notification on the user's personal socket for background rooms
  useEffect(() => {
    const handleNewMessageNotification = () => {
      refetchSupport();
      refetchAppointment();
    };

    socketService.on('new_message_notification', handleNewMessageNotification);

    return () => {
      socketService.off('new_message_notification', handleNewMessageNotification);
    };
  }, [refetchSupport, refetchAppointment]);

  return {
    values: {
      chats,
      isLoading,
      isRefreshing,
      searchQuery,
      filteredChats,
      filter,
    },
    functions: {
      onRefresh,
      onChatPress,
      setSearchQuery,
      setFilter,
    },
  };
};

export default useChatListController;
