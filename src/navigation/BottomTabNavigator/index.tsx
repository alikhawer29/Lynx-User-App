import { BottomTabBarProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { getFocusedRouteNameFromRoute } from "@react-navigation/native"
import React from "react"
import { TouchableOpacity, View } from "react-native"
import images from "../../assets/images"
import Icon from "../../components/Icon"
import Text from "../../components/Text"
import { useAppSelector } from "../../hooks"
import { selectLoggedIn } from "../../redux/Slices/AuthSlice"
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
                                <Icon
                                    size={24}
                                    tint_color={focused ? colors.primary : colors.dark_gray}
                                    source={images.tab_chat}
                                />
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