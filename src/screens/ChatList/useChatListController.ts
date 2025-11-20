import { useState, useEffect, useMemo } from 'react';
import {
  useGetUserChatsQuery,
  useCreateSupportChatMutation,
} from '../../redux/Apis/Chat';
import { ChatRoom } from '../../types/chat';
import { navigate } from '../../utils/navigation';
import { ROUTES } from '../../utils/routes';

type FilterType = 'all' | 'support' | 'appointment';

const useChatListController = () => {
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

    // Apply search
    if (searchQuery.trim()) {
      filtered = filtered.filter(chat => {
        const otherUser = chat.other_user || chat.other_user_id;
        const displayName =
          chat.chat_type === 'support'
            ? 'Customer Support'
            : `${otherUser?.first_name || ''} ${
                otherUser?.last_name || ''
              }`.trim();

        return (
          displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          chat.last_message_text
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase())
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
    navigate(ROUTES.CHAT_ROOM, { chatRoom: chat });
  };

  // Create support chat if it doesn't exist
  useEffect(() => {
    const supportChats = supportChatsData?.data || [];
    if (supportChats.length === 0 && !isSupportLoading) {
      // Auto-create support chat
      createSupportChat({});
    }
  }, [supportChatsData, isSupportLoading]);

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
