import React from 'react';
import { View, TouchableOpacity, Linking } from 'react-native';
import Text from '../Text';
import Image from '../Image';
import { ChatMessage } from '../../types/chat';
import styles from './styles';
import dayjs from 'dayjs';
import colors from '../../utils/colors';
import { useAppSelector } from '../../hooks';
import images from '../../assets/images';

interface MessageBubbleProps {
  message: ChatMessage;
  showAvatar?: boolean;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, showAvatar = true }) => {
  const currentUserId = useAppSelector(state => state.auth.user?._id);
  const currentUserImage = useAppSelector(state => state.auth.user?.image_url);
  const isSender = message.sender_id._id === currentUserId || message.sender_id.id === currentUserId;

  const senderName = `${message.sender_id.first_name} ${message.sender_id.last_name}`;
  const avatarUrl = message.sender_id.image_url || null;
  const messageTime = dayjs(message.createdAt).format('hh:mm A');
  const dummyImage = images.profile;

  const hasAttachments = message.attachments_with_urls && message.attachments_with_urls.length > 0;

  const handleAttachmentPress = (url: string) => {
    Linking.openURL(url).catch(err => console.error('Failed to open URL:', err));
  };

  const renderAvatar = () => {
    if (!showAvatar) return null;

    if (avatarUrl) {
      return (
        // <Image
        //   source={{ uri: avatarUrl }}
        //   style={styles.avatar}
        //   resize="cover"
        // />
        <Image
          source={dummyImage}
          style={styles.avatar}
          resize="cover"
        />
      );
    }
    return (
      <View style={styles.avatar_placeholder}>
        <Text size={16} weight="semibold" color={colors.white}>
          {senderName.charAt(0).toUpperCase()}
        </Text>
      </View>
    );
  };

  return (
    <View style={[styles.container, isSender ? styles.sender_container : styles.receiver_container]}>
      {!isSender && renderAvatar()}
      <View style={[styles.bubble, isSender ? styles.sender_bubble : styles.receiver_bubble]}>
        {message.message_text && (
          <Text
            size={14}
            color={isSender ? colors.black : colors.black}
            style={styles.message_text}
          >
            {message.message_text}
          </Text>
        )}
        {hasAttachments && (
          <View style={styles.attachments_container}>
            {message.attachments_with_urls!.map((attachment, index) => (
              <TouchableOpacity
                key={attachment.id || index}
                style={styles.attachment_item}
                onPress={() => handleAttachmentPress(attachment.full_url || attachment.file_url)}
              >
                {attachment.file_type === 'image' ? (
                  <Image
                    source={{ uri: attachment.full_url || attachment.file_url }}
                    style={styles.attachment_image}
                    resize="cover"
                  />
                ) : (
                  <View style={styles.attachment_file}>
                    <Text size={12} color={colors.primary} numberOfLines={1}>
                      📎 {attachment.file_name}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        )}
        <Text size={11} color={colors.medium_gray} style={styles.time_text}>
          {messageTime}
        </Text>
      </View>
      {isSender && renderAvatar()}
    </View>
  );
};

export default MessageBubble;

