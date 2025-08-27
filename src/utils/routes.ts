const NAVIGATORS = {
    AUTH_STACK: "AuthStackNavigator",
    SERVICE_STACK: "ServiceStackNavigator",
    NOTIFICATION_STACK: "NotificationStackNavigator",
    BOTTOM: "BottomTabNavigator",
    DRAWER: "DrawerNavigator",
    HOME_STACK: "HomeStackNavigator",
    NEWSFEED_STACK: "NewsFeedStackNavigator",
    PROGRESS_TRACKING_STACK: "ProgressTrackingStackNavigator",
    CHAT_STACK: "ChatStackNavigator",
    MY_PROFILE_STACK: "MyProfileStackNavigator",
    MUSIC_PANEL_STACK: "MusicPanelStackNavigator",
    HELP_DESK_STACK: "HelpDeskStackNavigator",
    SUBSCRIPTION_STACK: "SubscriptionStackNavigator",
} as const

const ROUTES = {
    ONBOARDING: "Onboarding",
    LOGIN: "Login",
    REGISTER: "Register",
    AUTH_TYPE: "AuthType",
    FORGOT_PASSWORD: "ForgotPassword",
    VERIFY_CODE: "VerifyCode",
    SET_PASSWORD: "SetPassword",
    HOME: "Home",
    SERVICES: "Services",
    SERVICE_DETAILS: "ServiceDetails",
    NOTIFICATIONS: "Notifications",
    PROGRESS_TRACKING: "ProgressTracking",
    CHAT: "Chat",
    MY_PROFILE: "MyProfile",
    CHANGE_PASSWORD: "ChangePassword",
    MUSIC_AUTH: "MusicAuth",
    PLAYLIST_DETAILS: "PlaylistDetails",
    HELP_DESK: "HelpDesk",
    SUBSCRIPTION: "Subscription",
    SUBSCRIPTION_LOGS: "SubscriptionLogs",
    CHATBOT: "Chatbot",
} as const

const ROUTES_OPTIONS = [
    {
        route_name: ROUTES.HOME,
        left: "drawer",
        right: "notifications",
        profile: true,
        auth: true
    },
    {
        route_name: ROUTES.SERVICES,
        left: "drawer",
        right: "notifications",
        profile: false,
        title: "All Services",
        auth: true
    },
    {
        route_name: ROUTES.SERVICE_DETAILS,
        left: "back",
        right: null,
        profile: false,
        title: "Service Details"
    },
    {
        route_name: ROUTES.NOTIFICATIONS,
        left: "back",
        right: null,
        profile: false,
        title: "Notifications"
    },
    {
        route_name: ROUTES.CHAT,
        left: "drawer",
        right: "notifications",
        profile: false,
        title: "Chats"
    },
    {
        route_name: ROUTES.MY_PROFILE,
        left: "drawer",
        right: "notifications",
        profile: false,
        title: "My Profile"
    },
    {
        route_name: ROUTES.CHANGE_PASSWORD,
        left: "back",
        right: null,
        profile: false,
        title: "Change Password",
        bottom_tab: false
    },
] as const

export { NAVIGATORS, ROUTES, ROUTES_OPTIONS }
