import { FC, memo } from "react"
import { TouchableOpacity, View } from "react-native"
import { Notification } from "../../../types/notifications"
import colors from "../../../utils/colors"
import Icon from "../../Icon"
import Row from "../../Row"
import Text from "../../Text"
import styles from "./styles"
import images from "../../../assets/images"

interface NotificationCardProps {
    data: Notification;
    onPress?: () => void;
}

/**
 * Format ISO date string to readable date
 * @param isoString - ISO date string (e.g., "2025-11-19T10:10:41.556Z")
 * @returns Formatted date (e.g., "Nov 19, 2025")
 */
const formatDate = (isoString: string): string => {
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });
};

/**
 * Format ISO date string to time with AM/PM
 * @param isoString - ISO date string (e.g., "2025-11-19T10:10:41.556Z")
 * @returns Formatted time (e.g., "10:10 AM")
 */
const formatTime = (isoString: string): string => {
    const date = new Date(isoString);
    return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    });
};

/**
 * Check if date is today
 * @param isoString - ISO date string
 * @returns true if date is today
 */
const isToday = (isoString: string): boolean => {
    const date = new Date(isoString);
    const today = new Date();
    return date.toDateString() === today.toDateString();
};

/**
 * Check if date is yesterday
 * @param isoString - ISO date string
 * @returns true if date is yesterday
 */
const isYesterday = (isoString: string): boolean => {
    const date = new Date(isoString);
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return date.toDateString() === yesterday.toDateString();
};

/**
 * Get relative date label
 * @param isoString - ISO date string
 * @returns Relative date (e.g., "Today", "Yesterday", "Nov 19, 2025")
 */
const getRelativeDate = (isoString: string): string => {
    if (isToday(isoString)) return 'Today';
    if (isYesterday(isoString)) return 'Yesterday';
    return formatDate(isoString);
};

const NotificationCard: FC<NotificationCardProps> = ({ data, onPress }) => {
    const { notification, read, createdAt } = data;

    const displayDate = getRelativeDate(createdAt);
    const displayTime = formatTime(createdAt);

    return (
        <TouchableOpacity
            activeOpacity={0.7}
            onPress={onPress}
            disabled={!onPress}
        >
            <Row
                style={[
                    styles.container,
                    read ? styles.bg_transparent : styles.bg_primary_opacity,
                ]}
            >
                <View style={styles.icon_wrapper}>
                    <Icon source={images.profile} rounded size={48} no_padding />
                </View>

                <View style={styles.content}>
                    {/* Notification Title */}
                    {notification?.title && (
                        <Text
                            size={14}
                            weight="semibold"
                            color={colors.pure_black}
                            style={{ marginBottom: 4 }}
                        >
                            {notification.title}
                        </Text>
                    )}

                    {/* Notification Body */}
                    <Text
                        size={13}
                        color='#333333'
                        style={{ marginBottom: 8, lineHeight: 18 }}
                    >
                        {notification?.body}
                    </Text>

                    {/* Date, Time, and Action */}
                    <Row justify="space-between" align="center">
                        <View style={styles.flex_wrapper}>
                            <Text size={13} color='#000000'>
                                {displayDate}
                            </Text>
                        </View>

                        <View style={styles.flex_wrapper}>
                            <Text size={13} color='#000000' position="center">
                                {displayTime}
                            </Text>
                        </View>

                        <View style={styles.flex_wrapper}>
                            <Text
                                size={13}
                                color='#B69D74'
                                underline
                                position="right"
                                weight="semibold"
                            >
                                {read ? 'Mark Unread' : 'Mark as Read'}
                            </Text>
                        </View>
                    </Row>

                    {/* Unread Indicator */}
                    {!read && (
                        <View
                            style={{
                                width: 8,
                                height: 8,
                                borderRadius: 4,
                                backgroundColor: colors.primary,
                                marginTop: 8,
                            }}
                        />
                    )}
                </View>
            </Row>
        </TouchableOpacity>
    );
};

export default memo(NotificationCard);