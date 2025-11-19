import { SectionList, View, ActivityIndicator } from 'react-native';
import NotificationCard from '../../components/Cards/NotificationCard';
import Dropdown from '../../components/Dropdown';
import Row from '../../components/Row';
import Text from '../../components/Text';
import Wrapper from '../../components/Wrapper';
import useNotificationsController from './useNotificationController';
import colors from '../../utils/colors';
import {
  GLOBAL_HORIZONTAL_PADDING,
  heightPixel,
} from '../../utils/helper';

const Notifications = () => {
  const {
    values: {
      notificationData,
      contentLoading,
      error,
      notificationsTotal,
    },
    refs: {
      statusRef,
    },
    actions: {
      markAsRead,
      markAllAsRead,
      setStatus,
    },
  } = useNotificationsController();

  const handleStatusChange = (value: any) => {
    if (value?.value === 'all' || value?.value === 'read' || value?.value === 'unread') {
      setStatus(value.value);
    }
  };

  console.log(notificationData, 'notificationData')

  return (
    <Wrapper paddingHorizontal={false}>
      <Row
        align="center"
        justify="space-between"
        style={{
          paddingHorizontal: GLOBAL_HORIZONTAL_PADDING,
          marginBottom: heightPixel(10),
        }}
      >
        <Row style={{ width: '40%' }} align="center" gap={5}>
          <Text>Showing:</Text>
          <Dropdown
            height={40}
            options={[
              { label: 'All', value: 'all' },
              { label: 'Read', value: 'read' },
              { label: 'Unread', value: 'unread' },
            ]}
            value={statusRef.current}
            onChangeText={handleStatusChange}
          />
        </Row>
        <Row style={{ width: '50%' }} justify="flex-end">
          <Text
            underline
            color={colors.primary}
            onPress={markAllAsRead}
          >
            Mark All As Read
          </Text>
        </Row>
      </Row>

      {error && (
        <View
          style={{
            backgroundColor: colors.danger,
            paddingHorizontal: GLOBAL_HORIZONTAL_PADDING,
            paddingVertical: heightPixel(10),
            marginBottom: heightPixel(10),
            borderRadius: heightPixel(5),
          }}
        >
          <Text color={colors.white} size={14}>
            {error?.message || 'Failed to load notifications'}
          </Text>
        </View>
      )}

      {contentLoading && notificationData.length === 0 ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: heightPixel(50),
          }}
        >
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : (
        <SectionList
          sections={notificationData}
          keyExtractor={item => item._id}
          renderItem={({ item }) => (
            <NotificationCard
              data={item}
              onPress={() => markAsRead(item._id)}
            />
          )}
          renderSectionHeader={({ section: { title } }) => (
            <View
              style={{
                backgroundColor: colors.light_primary,
                paddingHorizontal: GLOBAL_HORIZONTAL_PADDING,
                paddingVertical: heightPixel(5),
              }}
            >
              <Text size={16} weight="semibold">{title}</Text>
            </View>
          )}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            !contentLoading ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingVertical: heightPixel(50),
                }}
              >
                <Text size={16} color={colors.dark_gray}>
                  No {statusRef.current !== 'all' ? statusRef.current : ''} notifications
                </Text>
              </View>
            ) : null
          }
        />
      )}
    </Wrapper>
  );
};

export default Notifications;