import React from 'react';
import { View, FlatList, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
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
import useKeyboard from '../../hooks/useKeyboard';
import { heightPixel } from '../../utils/helper';

const ChatRoom = () => {
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const keyboardHeight = useKeyboard();
  const isKeyboardOpen = keyboardHeight > 0;

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
  console.log("messages", messages)

  const renderMessage = ({ item, index }: { item: ChatMessage; index: number }) => {
    // Data is newest-first; messages[index+1] is the older neighbour (rendered above).
    // Show a separator when crossing a day boundary moving upward (older direction).
    const olderMessage = index < messages.length - 1 ? messages[index + 1] : null;
    const showDateSeparator =
      !olderMessage ||
      !dayjs(item.createdAt).isSame(dayjs(olderMessage.createdAt), 'day');

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
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? headerHeight : 0}
    >
      <Wrapper>
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={item => item.id || item._id}
          ListEmptyComponent={renderEmpty}
          ListFooterComponent={renderFooter}
          inverted
          contentContainerStyle={messages.length === 0 && styles.empty_list}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode={Platform.OS === 'ios' ? 'interactive' : 'on-drag'}
          showsVerticalScrollIndicator={false}
        />
        {canSendMessages && (
          <View style={{
            paddingVertical: heightPixel(10),
            paddingBottom:
              Platform.OS === 'ios'
                ? null
                : (isKeyboardOpen ? heightPixel(80) : heightPixel(0)) + insets.bottom,
          }}>
            <ChatInput
              onSend={onSendMessage}
              isLoading={isSending}
              disabled={!canSendMessages}
            />
          </View>
        )}
      </Wrapper>
    </KeyboardAvoidingView>
  );
};

export default ChatRoom;

