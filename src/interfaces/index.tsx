import { ReactNode } from "react";
import { ColorValue, DimensionValue, GestureResponderEvent, ImageResizeMode, ImageSourcePropType, ImageStyle, Insets, StyleProp, TextStyle, ViewStyle } from "react-native";
import { IndicatorName } from "react-native-loader-kit";

export type InputType = 'email' | 'text' | 'password' | 'number' | 'textarea' | 'time' | 'phone' | 'date';

export type AppStackParamList = {
    AuthStackNavigator: undefined
    DrawerNavigator: undefined
};

export type AuthStackParamList = {
    Login: undefined
    Register: undefined
    AuthType: undefined
    ForgotPassword: { type: InputType }
    VerifyCode: { via: string, email: string, dialing_code: string, phone: string }
    SetPassword: { via: string, email: string, dialing_code: string, phone: string, token: string }
};

export type HomeStackParamList = {
    Home: undefined;
    ServiceDetails: { id?: string | number };
    RateAndReview: {
        serviceId: string;
        reviews: any[];
        avgRating: number;
        reviewCount: number;
    };
    BookService: {
        service: ServiceData;
        selectedTier: number;
        confirmedAddress?: string;
        confirmedFloor?: string;
        confirmedLat?: number;
        confirmedLng?: number;
        firstName?: string;
        lastName?: string;
        phone?: string;
        phoneCountry?: string;
        phoneDialingCode?: string;
        email?: string;
        selectedTimeSlot?: string;
        selectedSlotId?: string;
        selectedDate?: string;
    };
    LocationView: {
        service: ServiceData;
        selectedTier: number;
        address?: string;
        floor?: string;
        viewOnly?: boolean;
    };
    ServiceDateTime: {
        service: ServiceData;
        selectedTier: number;
        address: string;
        floor?: string;
        lat?: number;
        lng?: number;
        firstName?: string;
        lastName?: string;
        phone?: string;
        phoneCountry?: string;
        phoneDialingCode?: string;
        email?: string;
        selectedTimeSlot?: string;
        selectedSlotId?: string;
        selectedDate?: string;
    };
    PaymentDetails: {
        service: ServiceData;
        selectedTier: number;
        address: string;
        floor?: string;
        firstName: string;
        lastName: string;
        phone: string;
        email: string;
        sessionTime: string;
        sessionDate: string;
        availableHours: string;
        bookingId: string;
        bookingNumber?: string;
    };
}

export type NotificationStackParamList = {
    Notifications: undefined;
}

export type ChatStackParamList = {
    Chat: undefined;
    ChatList: undefined;
    ChatRoom: {
        chatRoom: any;
        bookingId?: string;
    };
}

export type MyProfileStackParamList = {
    MyProfile: undefined;
}

export type AboutUsStackParamList = {
    AboutUs: undefined;
}

export type FaqsStackParamList = {
    Faqs: undefined;
}

export type ContactUsStackParamList = {
    ContactUs: undefined;
}

export type ServiceStackParamList = {
    Services: undefined;
    ServiceDetails: { id?: string | number };
    RateAndReview: {
        serviceId: string;
        reviews: any[];
        avgRating: number;
        reviewCount: number;
    };
    BookService: {
        service: ServiceData;
        selectedTier: number;
        confirmedAddress?: string;
        confirmedFloor?: string;
        confirmedLat?: number;
        confirmedLng?: number;
        firstName?: string;
        lastName?: string;
        phone?: string;
        phoneCountry?: string;
        phoneDialingCode?: string;
        email?: string;
        selectedTimeSlot?: string;
        selectedSlotId?: string;
        selectedDate?: string;
    };
    LocationView: {
        service: ServiceData;
        selectedTier: number;
        address?: string;
        floor?: string;
        viewOnly?: boolean;
    };
    ServiceDateTime: {
        service: ServiceData;
        selectedTier: number;
        address: string;
        floor?: string;
        lat?: number;
        lng?: number;
        firstName?: string;
        lastName?: string;
        phone?: string;
        phoneCountry?: string;
        phoneDialingCode?: string;
        email?: string;
        selectedTimeSlot?: string;
        selectedSlotId?: string;
        selectedDate?: string;
    };
    PaymentDetails: {
        service: ServiceData;
        selectedTier: number;
        address: string;
        floor?: string;
        firstName: string;
        lastName: string;
        phone: string;
        email: string;
        sessionTime: string;
        sessionDate: string;
        availableHours: string;
        bookingId: string;
        bookingNumber?: string;
    };
    MyAppointments: undefined; // ← Added this line

}

export type MyAppointmentsStackParamList = {
    MyAppointments: undefined;
    AppointmentDetails: {
        bookingId: string;
    };
    LocationView: {
        lat: number;
        lng: number;
        address?: string;
        floor?: string;
        viewOnly?: boolean;
    };
    ChatRoom: {
        chatRoom: any;
        bookingId?: string;
    };
}

export type WishlistStackParamList = {
    Wishlist: undefined;
}

export type EducationalContentStackParamList = {
    EducationalContent: undefined;
    ViewArticle: { id: string };
    ViewVideo: { id: string };
}

export type OfflineContentStackParamList = {
    OfflineContent: undefined;
    ViewArticle: { id: string };
    ViewVideo: { id: string };
}

export type RootStackParamList = {
    MyProfile: undefined
    EditProfile: undefined
    ChangePassword: undefined
    Chat: undefined
    NewsFeed: undefined
    ProgressTracking: undefined
    MusicAuth: undefined
    PlaylistDetails: { id: string },
    HelpDesk: undefined,
    Subscription: undefined,
    SubscriptionLogs: undefined,
    Chatbot: undefined
};

export type TContentType = "article" | "video"

export interface IWrapper {
    children: ReactNode
    scrollable?: boolean
    bottom_bar?: boolean
    no_padding?: boolean
}

export interface IAuthWrapper extends IWrapper {
    title?: string,
    subtitle?: string,
}

export interface ICardWrapper extends IWrapper {
    height?: DimensionValue
    width?: DimensionValue
    border_radius?: number
    padding?: number
    border?: boolean
    border_color?: ColorValue
    color?: ColorValue
    onPress?: (event: GestureResponderEvent) => void
}

export interface IImage {
    source: ImageSourcePropType | undefined
    style?: StyleProp<ImageStyle>,
    resize?: ImageResizeMode
}

export interface IText {
    children: ReactNode
    weight?: 'bold' | 'semibold' | 'regular'
    size?: number
    style?: StyleProp<TextStyle>
    color?: string
    line_height?: number
    lines?: number
    underline?: boolean
    capitalize?: boolean
    position?: 'auto' | 'left' | 'right' | 'center' | 'justify'
    onPress?: (event: GestureResponderEvent) => void
}

export interface ITouchable {
    children: ReactNode
    onPress?: (event: GestureResponderEvent) => void
    onLongPress?: (event: GestureResponderEvent) => void
    onPressOut?: (event?: GestureResponderEvent) => void
    disabled?: boolean
    effect?: boolean
    slop?: Insets
    style?: StyleProp<ViewStyle>
}

export interface IButton {
    text: string
    font_size?: number
    onPress?: () => void
    style?: StyleProp<ViewStyle>
    type?: "primary" | "secondary" | "outlined" | "custom",
    icon?: ImageSourcePropType,
    loading?: boolean,
    height?: number,
}

export interface IRow {
    children: ReactNode
    align?: "flex-start" | "flex-end" | "center" | "baseline" | "stretch"
    justify?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around"
    | "space-evenly"
    onPress?: () => void
    style?: StyleProp<ViewStyle>
    gap?: number
    wrap?: boolean
}

export interface IInput {
    label?: string;
    placeholder?: string;
    type?: InputType;
    icon?: any;
    error?: string;
    country?: string;
    value?: string;
    mode?: "primary" | "secondary";
    onChangeText?: (text: string) => void;
    onChangeCountry?: (country: any) => void;
    onSubmitEditing?: () => void;
    maxLength?: number;
    disabled?: boolean;
    required?: boolean;
    height?: number;
}

export interface IIcon {
    size?: number | `${number}%`
    color?: string
    source?: ImageSourcePropType
    rounded?: boolean
    tint_color?: string
    onPress?: () => void
    border?: string
    less_padding?: boolean
    less_rounded?: boolean
    no_padding?: boolean
    rotate?: boolean,
    resize?: 'cover' | 'contain'
}

export interface IProgressBar {
    progress: number
}

export interface IProgressCard extends IProgressBar {
    icon: ImageSourcePropType
    title: string
}

export interface IVideoCard {
    image: ImageSourcePropType
    title: string
    description: string
    date: string
    language: string
}

export interface IWorkoutCard extends IProgressBar {
    image: ImageSourcePropType
    title: string
    description: string
    helper_text: string
    duration: string
    schedule: string
}

export interface IAuthSelectionCard {
    image?: ImageSourcePropType
    title: string
    description: string,
    selected?: boolean,
    onPress?: (event: GestureResponderEvent) => void
}


export interface ITrackingCard extends IProgressBar {
    icon: ImageSourcePropType
    title: string
    subtext: string
}

export interface INewsFeedCard {
    content: string
    user?: any
    reaction_count: number
    comment_count: number
}

export interface IChatCard {
    message: string
    user?: any
    created_at: string
    system?: boolean
}

export interface LabelValueItem {
    label: string;
    value: string | number;
}

export interface ITabs {
    tabs: LabelValueItem[]
    selected: string | number
    setSelected: (value: string | number) => void
    type?: 'basic' | 'advanced'
}

export interface IUpload {
    text?: string
    required?: boolean
    style?: StyleProp<ViewStyle>
    onPress?: () => void
}

export interface ICheckbox {
    checked?: boolean
    label?: string
    onPress?: () => void
}

export interface ISeperator {
    horizontal?: boolean
    size?: number
}

export interface IPlaylistCard {
    icon: ImageSourcePropType
    title: string
    onPress: () => void
}

export interface ISongCard {
    icon: ImageSourcePropType
    title: string
    artist: string
    onPress: () => void,
    active?: boolean
}

export interface ILoader {
    color?: string
    type?: IndicatorName,
    vertical?: number,
    size?: number
    text?: string
}

export interface IHelpDeskCard {
    color?: string,
    icon: ImageSourcePropType,
    title: string,
    onPress?: () => void
}

export interface ISubscriptionLogCard {
    subscription_type: string
    subscribed_on: string
    expired_on: string
    amount: string
    label: {
        text: string
        color: string,
        underline?: boolean,
        onPress?: () => void | undefined
    }
}

export interface IEmpty {
    message?: string
    image?: ImageSourcePropType
}

export interface IChatItemCard {
    message: string
    image?: any
    created_at: string
    sender?: boolean
    typing?: boolean
}

// new

interface NotificationData {
    message: string
    date: string
    time: string
    read: boolean
    image: any
}

interface CategoryData {
    _id?: string
    name: string
    price: {
        normal: string | number
        premium: string | number
    }
}

export interface ServiceData {
    _id: string
    name: string
    category: CategoryData
    description: string
    rating: number
    review_count?: number
    image_url?: any
    is_favorite?: boolean,
    avg_rating?: number
}

export interface ContentData {
    _id: string
    title: string
    description: string
    media_url?: string
    media_thumbnail_url?: string
    createdAt: Date
    type: "article" | "video"
}

export interface INotificationCard {
    data: NotificationData
}

export interface IRatings {
    review_count?: number | null
    rating: number
    size?: number
}

export interface IServiceCard {
    data: ServiceData,
    onPress?: () => void,
    onFavorite?: () => void,
}

export interface IContentCard {
    data: ContentData,
    onPress?: () => void,
    type: TContentType
}

export interface IBadge {
    text: string,
    size?: number
}

export interface IKeyboardAvoidingWrapper {
    children: ReactNode
}

export interface IEmpty {
    label?: string
}

export interface IFilterModal {
    open: boolean
    handleClose: () => void
    filters: number[]
    onApply: (selected: number[]) => void
}