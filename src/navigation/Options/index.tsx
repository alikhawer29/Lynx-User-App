import { StackNavigationOptions } from '@react-navigation/stack';
import React from 'react';
import images from '../../assets/images';
import Button from '../../components/Button';
import Icon from '../../components/Icon';
import Image from '../../components/Image';
import Row from '../../components/Row';
import Text from '../../components/Text';
import Touchable from '../../components/Touchable';
import colors from '../../utils/colors';
import { widthPixel } from '../../utils/helper';
import {
  goBack,
  navigate,
  navigateAndSimpleReset,
} from '../../utils/navigation';
import { NAVIGATORS, ROUTES, ROUTES_OPTIONS } from '../../utils/routes';
import ProfileViewer from '../../components/ProfileViewer';
import { View } from 'react-native';

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
          border={colors.medium_gray}
          size={40}
          rounded
          less_rounded
          less_padding
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

    const iconSource = currentRoute?.right ? images[currentRoute.right] : null;

    const onPress = () => {
      if (currentRoute?.right === 'notifications') {
        navigate(NAVIGATORS.NOTIFICATION_STACK);
      }
    };

    if (!iconSource) return null;

    return (
      <Touchable style={{ marginRight: widthPixel(20) }} onPress={onPress}>
        <Icon
          source={iconSource}
          border={colors.medium_gray}
          size={40}
          rounded
          less_rounded
          less_padding
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
        <Text weight="bold" size={23}>
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
    headerStyle: {
      backgroundColor: colors.light_primary,
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
