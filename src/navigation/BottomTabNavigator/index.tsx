import { BottomTabBarProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { getFocusedRouteNameFromRoute } from "@react-navigation/native"
import React, { useEffect } from "react"
import { TouchableOpacity, View } from "react-native"
import images from "../../assets/images"
import Icon from "../../components/Icon"
import Text from "../../components/Text"
import { useAppDispatch, useAppSelector } from "../../hooks"
import { incrementUnreadCount, selectTotalUnreadCount } from "../../redux/Slices/ChatSlice"
import { selectLoggedIn } from "../../redux/Slices/AuthSlice"
import socketService from "../../services/socket"
import colors from "../../utils/colors"
import { NAVIGATORS, ROUTES } from "../../utils/routes"
import ChatStackNavigator from "../ChatStackNavigator"
import HomeStackNavigator from "../HomeStackNavigator"
import ProfileStackNavigator from "../ProfileStackNavigator"
import ServiceStackNavigator from "../ServiceStackNavigator"
import styles from "./styles"

export type BottomTabParamList = {
    [NAVIGATORS.HOME_STACK]: undefined
    [NAVIGATORS.SERVICE_STACK]: undefined
    [NAVIGATORS.CHAT_STACK]: undefined
    [NAVIGATORS.MY_PROFILE_STACK]: undefined
}

const Tab = createBottomTabNavigator<BottomTabParamList>()

const CustomTabBar: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
    // Check if we're on ChatRoom screen
    const currentRoute = state.routes[state.index];
    const routeName = getFocusedRouteNameFromRoute(currentRoute);

    // Hide tab bar on ChatRoom screen
    if (routeName === ROUTES.CHAT_ROOM) {
        return null;
    }

    return (
        <View style={[styles.tab_bar, { justifyContent: "space-between" }]}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key]
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name

                const isFocused = state.index === index

                const onPress = () => {
                    const event = navigation.emit({
                        type: "tabPress",
                        target: route.key,
                        canPreventDefault: true,
                    })

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name as keyof BottomTabParamList)
                    }
                }

                return (
                    <TouchableOpacity
                        key={route.key}
                        onPress={onPress}
                        style={styles.tab_item}
                        activeOpacity={0.7}
                    >
                        {options.tabBarIcon && options.tabBarIcon({ focused: isFocused, color: "", size: 24 })}
                        <Text size={12} color={isFocused ? colors.primary : colors.dark_gray}>
                            {label as string}
                        </Text>
                        {isFocused && <View style={styles.active_indicator} />}
                    </TouchableOpacity>
                )
            })}
        </View>
    )
}

const BottomTabNavigator: React.FC = () => {

    const authorized = useAppSelector(selectLoggedIn)
    const dispatch = useAppDispatch()
    const totalUnreadCount = useAppSelector(selectTotalUnreadCount)

    // Global socket listener — lights up the badge on any screen when a background room gets a new message.
    // The server emits new_message_notification on the user's personal socket (joined by user_id on connect)
    // so this fires even when the user is not inside that specific chat room.
    useEffect(() => {
        if (!authorized) return

        const handleNewMessageNotification = () => {
            dispatch(incrementUnreadCount())
        }

        socketService.on('new_message_notification', handleNewMessageNotification)

        return () => {
            socketService.off('new_message_notification', handleNewMessageNotification)
        }
    }, [authorized, dispatch])

    return (
        <Tab.Navigator screenOptions={{ headerShown: false }} tabBar={(props) => <CustomTabBar {...props} />}>
            <Tab.Screen
                name={NAVIGATORS.HOME_STACK}
                component={HomeStackNavigator}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Icon
                            size={24}
                            tint_color={focused ? colors.primary : colors.dark_gray}
                            source={images.tab_home}
                        />
                    ),
                    tabBarLabel: "Home",
                }}
            />
            <Tab.Screen
                name={NAVIGATORS.SERVICE_STACK}
                component={ServiceStackNavigator}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Icon
                            size={24}
                            tint_color={focused ? colors.primary : colors.dark_gray}
                            source={images.tab_services}
                        />
                    ),
                    tabBarLabel: "Services",
                }}
            />
            {authorized && (
                <>
                    <Tab.Screen
                        name={NAVIGATORS.CHAT_STACK}
                        component={ChatStackNavigator}
                        options={{
                            tabBarIcon: ({ focused }) => (
                                <View>
                                    <Icon
                                        size={24}
                                        tint_color={focused ? colors.primary : colors.dark_gray}
                                        source={images.tab_chat}
                                    />
                                    {totalUnreadCount > 0 && (
                                        <View style={{
                                            position: 'absolute',
                                            top: -3,
                                            right: -4,
                                            backgroundColor: colors.danger,
                                            borderRadius: 5,
                                            width: 10,
                                            height: 10,
                                        }} />
                                    )}
                                </View>
                            ),
                            tabBarLabel: "Chats",
                        }}
                    />
                    <Tab.Screen
                        name={NAVIGATORS.MY_PROFILE_STACK}
                        component={ProfileStackNavigator}
                        options={{
                            tabBarIcon: ({ focused }) => (
                                <Icon
                                    size={24}
                                    tint_color={focused ? colors.primary : colors.dark_gray}
                                    source={images.tab_profile}
                                />
                            ),
                            tabBarLabel: "My Profile",
                        }}
                    />
                </>
            )}
        </Tab.Navigator>
    )
}

export default BottomTabNavigator