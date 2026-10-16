import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Text from '../../Text';
import Image from '../../Image';
import { ChatRoom } from '../../../types/chat';
import styles from './styles';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import colors from '../../../utils/colors';
import { getChatBookingDisplayId } from '../../../utils/chat';

dayjs.extend(relativeTime);

interface ChatListItemProps {
  chat: ChatRoom;
  onPress: () => void;
}

const ChatListItem: React.FC<ChatListItemProps> = ({ chat, onPress }) => {
  const isSupport = chat.chat_type === 'support';
  const otherUser = chat.other_user || chat.other_user_id;
  const displayName = isSupport
    ? 'Customer Support'
    : `${otherUser?.first_name || ''} ${otherUser?.last_name || ''}`.trim();

  const avatarUrl = otherUser?.image_url;
  const lastMessageText = chat.last_message_text || '?';
  const lastMessageTime = chat.last_message_time
    ? dayjs(chat.last_message_time).fromNow()
    : '';
  const bookingDisplayId = !isSupport ? getChatBookingDisplayId(chat) : null;

  const unreadCount = chat.my_unread_count || 0;
  const hasUnread = unreadCount > 0;

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
      {avatarUrl ? (
        <Image
          source={{ uri: avatarUrl }}
          style={styles.avatar}
          resize="cover"
        />
      ) : (
        <View style={styles.avatar_placeholder}>
          <Text size={16} weight="semibold" color='#333333'>
            {displayName.charAt(0).toUpperCase()}
          </Text>
        </View>
      )}
      <View style={styles.content}>
        <View style={styles.header}>
          <Text size={16} weight="semibold" color='#333333' numberOfLines={1} style={styles.name}>
            {displayName}
          </Text>
          {lastMessageTime && (
            <Text size={12} color='#666666'>
              {lastMessageTime}
            </Text>
          )}
        </View>
        {bookingDisplayId ? (
          <Text size={12} color={colors.primary} numberOfLines={1} style={styles.booking_id}>
            Booking ID: #{bookingDisplayId}
          </Text>
        ) : null}
        <View style={styles.message_row}>
          <Text
            size={14}
            color='#666666'
            numberOfLines={2}
            style={styles.message_text}
          >
            {lastMessageText}
          </Text>
          {hasUnread && (
            <View style={styles.unread_badge}>
              <Text size={12} color={colors.white} weight="semibold">
                {unreadCount > 99 ? '99+' : unreadCount}
              </Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ChatListItem;

