import { useState, useEffect, useRef, useMemo } from 'react';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { FlatList } from 'react-native';
import { Asset } from 'react-native-image-picker';
import {
  useGetMessagesQuery,
  useSendMessageMutation,
  useMarkMessagesAsReadMutation,
} from '../../redux/Apis/Chat';
import { ChatRoom, ChatMessage } from '../../types/chat';
import socketService from '../../services/socket';
import { useAppSelector } from '../../hooks';

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

  console.log(chatRoom, 'chatRoomchatRoom');
  const currentUserId = useAppSelector(
    state => state.auth.user?._id || state.auth.user?.id,
  );

  const flatListRef = useRef<FlatList>(null);
  const [page, setPage] = useState(1);
  const [realtimeMessages, setRealtimeMessages] = useState<ChatMessage[]>([]);

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
    // Combine API messages with realtime messages
    const allMessages = [...msgs, ...realtimeMessages];
    // Remove duplicates based on _id or id
    const uniqueMessages = allMessages.filter(
      (msg, index, self) =>
        index === self.findIndex(m => (m._id || m.id) === (msg._id || msg.id)),
    );
    // Reverse to show latest at bottom (inverted FlatList will show them correctly)
    return [...uniqueMessages].reverse();
  }, [messagesData, realtimeMessages]);

  // Determine if user can send messages
  const canSendMessages = useMemo(() => {
    if (chatRoom.chat_type === 'support') {
      return true; // Support chat is always available
    }

    console.log(chatRoom, 'chatRoomchatRoom');
    console.log('is_chat_active value:', chatRoom?.is_chat_active);
    console.log('is_chat_active type:', typeof chatRoom?.is_chat_active);

    // For appointment chat, check if booking exists and is completed
    // If is_chat_active is undefined, default to true (allow chat)
    return chatRoom?.is_chat_active !== undefined
      ? chatRoom.is_chat_active
      : true;
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

    // Join chat room
    if (socketService.isConnected()) {
      socketService.joinChat(chatRoomId);
    }

    // Listen for new messages
    const handleReceiveMessage = (message: ChatMessage) => {
      console.log('Received message via socket:', message);
      setRealtimeMessages(prev => [...prev, message]);

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
