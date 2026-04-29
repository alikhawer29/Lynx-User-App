import { StackNavigationOptions } from '@react-navigation/stack';
import React from 'react';
import { View } from 'react-native';
import images from '../../assets/images';
import Button from '../../components/Button';
import Icon from '../../components/Icon';
import ProfileViewer from '../../components/ProfileViewer';
import Row from '../../components/Row';
import Text from '../../components/Text';
import Touchable from '../../components/Touchable';
import { useGetNotificationsQuery } from '../../redux/Apis/Notifications';
import { useAppSelector } from '../../hooks';
import { selectTotalUnreadCount } from '../../redux/Slices/ChatSlice';
import colors from '../../utils/colors';
import { widthPixel } from '../../utils/helper';
import {
  goBack,
  navigate,
  navigateAndSimpleReset,
} from '../../utils/navigation';
import { NAVIGATORS, ROUTES, ROUTES_OPTIONS } from '../../utils/routes';

interface NotificationBellButtonProps {
  transparent?: boolean;
}

const NotificationBellButton: React.FC<NotificationBellButtonProps> = ({ transparent }) => {
  const { data } = useGetNotificationsQuery('unread');
  const unreadNotifications = data?.data?.length ?? 0;
  const unreadMessages = useAppSelector(selectTotalUnreadCount);

  // Show the dot for either unread general notifications OR unread chat messages
  const showBadge = unreadNotifications > 0 || unreadMessages > 0;

  return (
    <Touchable
      style={{ marginRight: widthPixel(20) }}
      onPress={() => navigate(NAVIGATORS.NOTIFICATION_STACK)}
    >
      <View>
        <Icon
          source={images.notifications}
          border={transparent ? colors.white : colors.medium_gray}
          size={40}
          rounded
          less_rounded
          less_padding
          tint_color={transparent && colors.white}
        />
        {showBadge && (
          <View style={{
            position: 'absolute',
            top: 2,
            right: 2,
            backgroundColor: colors.danger,
            borderRadius: 5,
            width: 10,
            height: 10,
          }} />
        )}
      </View>
    </Touchable>
  );
};

type OptionsProps = {
  route: { name: string };
  navigation: any;
};

const Options = (
  props: OptionsProps,
  loggedIn?: boolean,
): StackNavigationOptions => {
  const currentRoute = ROUTES_OPTIONS.find(
    item => item.route_name === props?.route?.name,
  );

  const renderLeft = () => {
    const iconSource = currentRoute?.left ? images[currentRoute.left] : null;

    const onPress = () => {
      if (currentRoute?.left === 'back') {
        goBack();
      } else if (currentRoute?.left === 'drawer') {
        props?.navigation.openDrawer();
      }
    };

    if (!iconSource) return null;

    return (
      <Touchable
        onPress={onPress}
        style={{ zIndex: 99, marginLeft: widthPixel(20) }}
      >
        <Icon
          source={iconSource}
          border={currentRoute?.transparent ? colors.white : colors.medium_gray}
          size={40}
          rounded
          less_rounded
          less_padding
          tint_color={currentRoute?.transparent && colors.white}
        />
      </Touchable>
    );
  };

  const renderRight = () => {
    if (!loggedIn && currentRoute?.auth) {
      return (
        <Row align="center" gap={10} style={{ marginRight: widthPixel(20) }}>
          <Button
            type="secondary"
            text="Login"
            height={36}
            onPress={() =>
              navigateAndSimpleReset(NAVIGATORS.AUTH_STACK, 0, {
                screen: ROUTES.LOGIN,
              })
            }
          />
          <Button
            text="Register"
            height={36}
            onPress={() =>
              navigateAndSimpleReset(NAVIGATORS.AUTH_STACK, 0, {
                screen: ROUTES.REGISTER,
              })
            }
          />
        </Row>
      );
    }

    if (currentRoute?.right === 'notifications') {
      return <NotificationBellButton transparent={currentRoute?.transparent} />;
    }

    const iconSource = currentRoute?.right ? images[currentRoute.right] : null;

    const onPress = () => { };

    if (!iconSource) return null;

    return (
      <Touchable style={{ marginRight: widthPixel(20) }} onPress={onPress}>
        <Icon
          source={iconSource}
          border={currentRoute?.transparent ? colors.white : colors.medium_gray}
          size={40}
          rounded
          less_rounded
          less_padding
          tint_color={currentRoute?.transparent && colors.white}
        />
      </Touchable>
    );
  };

  const renderTitle = () => {
    if (currentRoute?.profile && loggedIn) {
      return (
        <View style={{ marginLeft: widthPixel(15) }}>
          <ProfileViewer />
        </View>
      );
    } else if ((loggedIn || !currentRoute?.auth) && currentRoute?.title) {
      return (
        <Text weight="bold" size={23} line_height={30} color={currentRoute?.transparent ? colors.white : colors.black}>
          {currentRoute?.title}
        </Text>
      );
    }

    return null;
  };

  const getTitleAlignment = () => {
    return currentRoute?.profile ? 'left' : 'center';
  };

  return {
    headerShown: true,
    headerTransparent: currentRoute?.transparent,
    headerStyle: {
      backgroundColor: currentRoute?.transparent ? colors.transparent : colors.light_primary,
      elevation: 0,
      shadowOpacity: 0,
    },
    headerTitleAlign: getTitleAlignment(),
    headerTitle: renderTitle,
    headerLeft: renderLeft,
    headerRight: renderRight,
  };
};

export default Options;
