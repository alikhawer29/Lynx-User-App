// navigation.ts
import {
  CommonActions,
  createNavigationContainerRef,
} from '@react-navigation/native';
import {
  AppStackParamList,
  AuthStackParamList,
  EducationalContentStackParamList,
  OfflineContentStackParamList,
  MyAppointmentsStackParamList,
  RootStackParamList,
  ServiceStackParamList,
} from '../interfaces';

// Add navigator types for cross-stack navigation
type NavigatorParamList = {
  MyAppointmentsStackNavigator: undefined;
  EducationalContentStackNavigator: undefined;
  OfflineContentStackNavigator: undefined;
  WishlistStackNavigator: undefined;
  ServiceStackNavigator: undefined;
  HomeStackNavigator: undefined;
  BottomTabNavigator: undefined;
  DrawerNavigator: undefined;
};

type CombinedParamList = RootStackParamList &
  AuthStackParamList &
  AppStackParamList &
  ServiceStackParamList &
  EducationalContentStackParamList &
  OfflineContentStackParamList &
  MyAppointmentsStackParamList &
  NavigatorParamList;

export const navigationRef = createNavigationContainerRef<CombinedParamList>();

export const navigate = <RouteName extends keyof CombinedParamList>(
  name: RouteName,
  params?: undefined extends CombinedParamList[RouteName]
    ? CombinedParamList[RouteName] | undefined
    : CombinedParamList[RouteName],
) => {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
};

export const goBack = () => {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(CommonActions.goBack());
  }
};

export const navigateAndSimpleReset = <
  RouteName extends keyof CombinedParamList,
>(
  name: RouteName,
  index: number = 0,
  params?: undefined extends CombinedParamList[RouteName]
    ? CombinedParamList[RouteName] | undefined
    : CombinedParamList[RouteName],
) => {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      CommonActions.reset({
        index,
        routes: [{ name, params }],
      }),
    );
  }
};
