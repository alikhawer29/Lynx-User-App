import { useState, useEffect, useRef, useMemo } from 'react';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { FlatList } from 'react-native';
import { Asset } from 'react-native-image-picker';
import {
  useGetMessagesQuery,
  useSendMessageMutation,
  useMarkMessagesAsReadMutation,
} from '../../redux/Apis/Chat';
import { useGetBookingDetailsQuery } from '../../redux/Apis/Booking';
import { ChatRoom, ChatMessage } from '../../types/chat';
import socketService from '../../services/socket';
import { useAppSelector } from '../../hooks';
import {
  canSendAppointmentChatMessages,
  getChatBookingDisplayId,
  getChatBookingMongoId,
} from '../../utils/chat';

type ChatRoomRouteParams = {
  ChatRoom: {
    chatRoom: ChatRoom;
    bookingId?: string;
    bookingStatus?: string;
  };
};

const useChatRoomController = () => {
  const route = useRoute<RouteProp<ChatRoomRouteParams, 'ChatRoom'>>();
  const navigation = useNavigation();
  const { chatRoom, bookingId, bookingStatus } = route.params;

  const currentUserId = useAppSelector(
    state => state.auth.user?._id || state.auth.user?.id,
  );

  const flatListRef = useRef<FlatList>(null);
  const [page, setPage] = useState(1);
  const [realtimeMessages, setRealtimeMessages] = useState<ChatMessage[]>([]);

  const bookingMongoId = useMemo(
    () => getChatBookingMongoId(chatRoom),
    [chatRoom],
  );

  // Live booking status — chat list is_chat_active can be stale after slot ends
  const {
    data: bookingDetailsData,
    isFetching: isBookingStatusFetching,
    isError: isBookingStatusError,
  } = useGetBookingDetailsQuery(bookingMongoId as string, {
    skip: chatRoom?.chat_type !== 'appointment' || !bookingMongoId,
  });

  const resolvedBookingStatus = useMemo(() => {
    const live =
      bookingDetailsData?.data?.booking_status ||
      bookingDetailsData?.booking_status;
    return live || bookingStatus || null;
  }, [bookingDetailsData, bookingStatus]);

  // Set dynamic title based on chat type (include Booking ID for appointment chats)
  useEffect(() => {
    if (chatRoom) {
      if (chatRoom.chat_type === 'support') {
        navigation.setOptions({ title: 'Customer Support' });
        return;
      }

      const name =
        `${chatRoom.other_user?.first_name || chatRoom.other_user_id?.first_name || ''} ${
          chatRoom.other_user?.last_name || chatRoom.other_user_id?.last_name || ''
        }`.trim() || 'Chat';
      const bookingDisplayId =
        getChatBookingDisplayId(chatRoom) ||
        (bookingId ? String(bookingId).slice(-8) : null);

      navigation.setOptions({
        title: bookingDisplayId ? `${name} · #${bookingDisplayId}` : name,
      });
    }
  }, [chatRoom, bookingId, navigation]);

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
    // Realtime messages are newest; merge then deduplicate
    const allMessages = [...realtimeMessages, ...msgs];
    const uniqueMessages = allMessages.filter(
      (msg, index, self) =>
        index === self.findIndex(m => (m._id || m.id) === (msg._id || msg.id)),
    );
    // Sort newest-first so data[0] (newest) appears at the bottom of the inverted FlatList
    return uniqueMessages.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  }, [messagesData, realtimeMessages]);

  // Appointment chat: history always viewable; type box only while booking is in-progress
  const canSendMessages = useMemo(() => {
    if (chatRoom?.chat_type === 'support') {
      return true;
    }

    // Hide input until live status is known (prevents past bookings flashing the type box)
    if (
      bookingMongoId &&
      !resolvedBookingStatus &&
      isBookingStatusFetching &&
      !isBookingStatusError
    ) {
      return false;
    }

    return canSendAppointmentChatMessages(chatRoom, resolvedBookingStatus);
  }, [
    chatRoom,
    resolvedBookingStatus,
    bookingMongoId,
    isBookingStatusFetching,
    isBookingStatusError,
  ]);

  const disabledMessage = useMemo(() => {
    if (canSendMessages) return null;

    if (chatRoom.chat_type === 'appointment') {
      return 'The appointment chat is only available when booking is in-progress.';
    }
    return null;
  }, [canSendMessages, chatRoom]);

  const onSendMessage = async (messageText: string, files?: Asset[]) => {
    // Hard-block sends when booking is not in-progress
    if (!canSendAppointmentChatMessages(chatRoom, resolvedBookingStatus)) {
      return;
    }

    try {
      const chatRoomId = chatRoom.id || chatRoom._id;

      // If files are attached, use REST API
      if (files && files.length > 0) {
        const formData = new FormData();
        formData.append('chat_room_id', chatRoomId);

        if (messageText) {
          formData.append('message_text', messageText);
        }

        files.forEach((file, index) => {
          formData.append(`files[${index}]`, {
            uri: file.uri,
            type: file.type || 'image/jpeg',
            name: file.fileName || `file_${index}.jpg`,
          } as any);
        });

        await sendMessage({ formData, chatRoomId }).unwrap();
      } else if (messageText) {
        // For text-only messages, use socket
        if (socketService.isConnected()) {
          socketService.sendMessage(chatRoomId, messageText);
        } else {
          // Fallback to REST API if socket not connected
          const formData = new FormData();
          formData.append('chat_room_id', chatRoomId);
          formData.append('message_text', messageText);
          await sendMessage({ formData, chatRoomId }).unwrap();
        }
      }

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

  // Socket: Join chat room and listen for messages
  useEffect(() => {
    const chatRoomId = chatRoom.id || chatRoom._id;

    const joinRoom = () => {
      if (socketService.isConnected()) {
        socketService.joinChat(chatRoomId);
      }
    };

    // Join immediately if already connected, otherwise wait for the connect event
    joinRoom();
    socketService.on('connect', joinRoom);

    // Listen for new messages
    const handleReceiveMessage = (message: ChatMessage) => {
      console.log('Received message via socket:', message);
      // Prepend so newest stays at index 0 (bottom of inverted FlatList)
      setRealtimeMessages(prev => [message, ...prev]);

      // Scroll to bottom
      setTimeout(() => {
        flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
      }, 100);

      // Mark as delivered if we're the receiver
      if (
        message.receiver_id &&
        (message.receiver_id._id || message.receiver_id) === currentUserId
      ) {
        socketService.markMessageDelivered(message._id || message.id);
      }
    };

    // Listen for message delivered acknowledgment
    const handleMessageDelivered = (data: {
      message_id: string;
      delivered_at: string;
    }) => {
      console.log('Message delivered:', data);
      // Update message status in UI if needed
    };

    // Listen for message read acknowledgment
    const handleMessageRead = (data: {
      message_id: string;
      read_at: string;
      chat_room_id: string;
    }) => {
      console.log('Message read:', data);
      // Update message status in UI if needed
    };

    // Listen for typing status
    const handleTypingStatus = (data: {
      chat_room_id: string;
      user_id: string;
      is_typing: boolean;
    }) => {
      console.log('User typing:', data);
      // Update typing indicator in UI if needed
    };

    // Listen for errors
    const handleError = (error: { message: string }) => {
      console.error('Socket error:', error);
    };

    socketService.on('receive_message', handleReceiveMessage);
    socketService.on('message_delivered_ack', handleMessageDelivered);
    socketService.on('message_read_ack', handleMessageRead);
    socketService.on('user_typing_status', handleTypingStatus);
    socketService.on('error', handleError);

    // Cleanup
    return () => {
      socketService.off('connect', joinRoom);
      socketService.off('receive_message', handleReceiveMessage);
      socketService.off('message_delivered_ack', handleMessageDelivered);
      socketService.off('message_read_ack', handleMessageRead);
      socketService.off('user_typing_status', handleTypingStatus);
      socketService.off('error', handleError);

      // Leave chat room
      if (socketService.isConnected()) {
        socketService.leaveChat(chatRoomId);
      }
    };
  }, [chatRoom, currentUserId]);

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
