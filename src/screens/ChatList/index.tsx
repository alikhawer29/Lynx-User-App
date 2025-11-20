import React from 'react';
import { View, FlatList, ActivityIndicator, RefreshControl, TextInput } from 'react-native';
import Wrapper from '../../components/Wrapper';
import Text from '../../components/Text';
import ChatListItem from '../../components/Cards/ChatListItem';
import Empty from '../../components/Empty';
import { ChatRoom } from '../../types/chat';
import styles from './styles';
import colors from '../../utils/colors';
import useChatListController from './useChatListController';
import Icon from '../../components/Icon';
import images from '../../assets/images';
import Touchable from '../../components/Touchable';
import Button from '../../components/Button';

const ChatList = () => {
  const {
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
  } = useChatListController();

  const renderChatItem = ({ item }: { item: ChatRoom }) => (
    <ChatListItem chat={item} onPress={() => onChatPress(item)} />
  );

  const renderHeader = () => (
    <View style={styles.header_container}>
      {/* Search Bar */}
      <View style={styles.search_container}>
        <TextInput
          style={styles.search_input}
          placeholder="Search here..."
          placeholderTextColor={colors.medium_gray}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <Icon source={images.search} size={20} tint_color={colors.medium_gray} />
      </View>
    </View>
  );

  const renderEmpty = () => {
    if (isLoading) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      );
    }
    return <Empty label="No chats available" />;
  };

  return (
    <Wrapper>
      <FlatList
        data={filteredChats}
        renderItem={renderChatItem}
        keyExtractor={item => item.id || item._id}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmpty}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            colors={[colors.primary]}
          />
        }
        contentContainerStyle={filteredChats.length === 0 && styles.empty_list}
      />
    </Wrapper>
  );
};

export default ChatList;

