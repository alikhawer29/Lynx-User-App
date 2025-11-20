import { useState, useEffect, useRef, useMemo } from 'react';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { FlatList } from 'react-native';
import { Asset } from 'react-native-image-picker';
import {
  useGetMessagesQuery,
  useSendMessageMutation,
  useMarkMessagesAsReadMutation,
} from '../../redux/Apis/Chat';
import { ChatRoom } from '../../types/chat';

type ChatRoomRouteParams = {
  ChatRoom: {
    chatRoom: ChatRoom;
    bookingId?: string;
  };
};

const useChatRoomController = () => {
  const route = useRoute<RouteProp<ChatRoomRouteParams, 'ChatRoom'>>();
  const navigation = useNavigation();
  const { chatRoom, bookingId } = route.params;

  const flatListRef = useRef<FlatList>(null);
  const [page, setPage] = useState(1);

  // Set dynamic title based on chat type
  useEffect(() => {
    if (chatRoom) {
      const title =
        chatRoom.chat_type === 'support'
          ? 'Customer Support'
          : `${chatRoom.other_user_id?.first_name || ''} ${
              chatRoom.other_user_id?.last_name || ''
            }`.trim() || 'Chat';

      navigation.setOptions({ title });
    }
  }, [chatRoom, navigation]);

  // Fetch messages
  const {
    data: messagesData,
    isLoading,
    refetch,
  } = useGetMessagesQuery({
    chatRoomId: chatRoom.id || chatRoom._id,
    page,
    per_page: 50,
  });

  const [sendMessage, { isLoading: isSending }] = useSendMessageMutation();
  const [markAsRead] = useMarkMessagesAsReadMutation();

  const messages = useMemo(() => {
    const msgs = messagesData?.data || [];
    // Reverse to show latest at bottom (inverted FlatList will show them correctly)
    return [...msgs].reverse();
  }, [messagesData]);

  // Determine if user can send messages
  const canSendMessages = useMemo(() => {
    if (chatRoom.chat_type === 'support') {
      return true; // Support chat is always available
    }
    // For appointment chat, check if it's active
    return chatRoom.is_active;
  }, [chatRoom]);

  const disabledMessage = useMemo(() => {
    if (canSendMessages) return null;

    if (chatRoom.chat_type === 'appointment') {
      return "You don't have any upcoming or in-progress booking with this service provider to chat. You must have an upcoming or in-progress booking to chat";
    }
    return null;
  }, [canSendMessages, chatRoom]);

  const onSendMessage = async (messageText: string, files?: Asset[]) => {
    try {
      const chatRoomId = chatRoom.id || chatRoom._id;
      const formData = new FormData();
      formData.append('chat_room_id', chatRoomId);

      if (messageText) {
        formData.append('message_text', messageText);
      }

      if (files && files.length > 0) {
        files.forEach((file, index) => {
          formData.append(`files[${index}]`, {
            uri: file.uri,
            type: file.type || 'image/jpeg',
            name: file.fileName || `file_${index}.jpg`,
          } as any);
        });
      }

      await sendMessage({ formData, chatRoomId }).unwrap();

      // Scroll to bottom after sending
      setTimeout(() => {
        flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
      }, 100);
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  // Mark messages as read when screen is focused
  useEffect(() => {
    if (chatRoom && messages.length > 0) {
      markAsRead(chatRoom.id || chatRoom._id);
    }
  }, [chatRoom, messages.length]);

  // Auto-refresh messages every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 5000);

    return () => clearInterval(interval);
  }, [refetch]);

  return {
    values: {
      messages,
      isLoading,
      isSending,
      chatRoom,
      canSendMessages,
      disabledMessage,
    },
    functions: {
      onSendMessage,
      flatListRef,
    },
  };
};

export default useChatRoomController;
