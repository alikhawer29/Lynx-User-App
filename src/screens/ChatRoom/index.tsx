import React from 'react';
import { View, FlatList, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import Wrapper from '../../components/Wrapper';
import Text from '../../components/Text';
import MessageBubble from '../../components/MessageBubble';
import ChatInput from '../../components/ChatInput';
import Empty from '../../components/Empty';
import { ChatMessage } from '../../types/chat';
import styles from './styles';
import colors from '../../utils/colors';
import useChatRoomController from './useChatRoomController';
import dayjs from 'dayjs';

const ChatRoom = () => {
  const {
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
  } = useChatRoomController();

  console.log(canSendMessages, 'canSendMessages')

  const renderMessage = ({ item, index }: { item: ChatMessage; index: number }) => {
    const previousMessage = index > 0 ? messages[index - 1] : null;
    const showDateSeparator =
      !previousMessage ||
      !dayjs(item.createdAt).isSame(dayjs(previousMessage.createdAt), 'day');

    return (
      <View>
        {showDateSeparator && (
          <View style={styles.date_separator}>
            <Text size={12} color={colors.medium_gray}>
              {dayjs(item.createdAt).format('dddd, DD MMMM YYYY')}
            </Text>
          </View>
        )}
        <MessageBubble message={item} />
      </View>
    );
  };

  const renderEmpty = () => {
    if (isLoading) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      );
    }
    // Wrap in a View with scaleY: -1 to counter the inverted FlatList
    return (
      <View style={{ transform: [{ scaleY: -1 }] }}>
        <Empty label="" />
      </View>
    );
  };

  const renderFooter = () => {
    if (!canSendMessages && disabledMessage) {
      return (
        <View style={styles.disabled_container}>
          <Text size={14} color={colors.dark_gray} position="center">
            {disabledMessage}
          </Text>
        </View>
      );
    }
    return null;
  };

  return (
    <Wrapper>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={item => item.id || item._id}
          ListEmptyComponent={renderEmpty}
          ListFooterComponent={renderFooter}
          inverted
          contentContainerStyle={messages.length === 0 && styles.empty_list}
        />
        {canSendMessages && (
          <ChatInput
            onSend={onSendMessage}
            isLoading={isSending}
            disabled={!canSendMessages}
          />
        )}
      </KeyboardAvoidingView>
    </Wrapper>
  );
};

export default ChatRoom;

