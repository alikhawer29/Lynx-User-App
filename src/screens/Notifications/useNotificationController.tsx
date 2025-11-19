// hooks/useNotificationsController.ts
import { useEffect, useRef } from 'react';
import {
    useGetNotificationsQuery,
    useMarkAllNotificationsAsReadMutation,
    useMarkNotificationAsReadMutation,
} from '../../redux/Apis/Notifications/index';
import { NotificationSection, NotificationStatus } from '../../types/notifications';

interface UseNotificationsControllerReturn {
    refs: {
        statusRef: React.MutableRefObject<NotificationStatus>;
    };
    values: {
        notificationData: NotificationSection[];
        contentLoading: boolean;
        error: any;
        notificationsTotal: number;
    };
    actions: {
        markAsRead: (notificationId: string) => Promise<void>;
        markAllAsRead: () => Promise<void>;
        setStatus: (status: NotificationStatus) => void;
    };
}

const useNotificationsController = (): UseNotificationsControllerReturn => {
    const statusRef = useRef<NotificationStatus>('all');

    const {
        data: notificationsResponse,
        isLoading: contentLoading,
        error,
        refetch,
    } = useGetNotificationsQuery(statusRef.current);

    const [markAsReadMutation] = useMarkNotificationAsReadMutation();
    const [markAllAsReadMutation] = useMarkAllNotificationsAsReadMutation();

    useEffect(() => {
        if (error) {
            console.log('Error fetching notifications:', error);
        }
    }, [error]);

    /**
     * Group notifications by date
     */
    const groupNotifications = (notifications: any[]): NotificationSection[] => {
        const grouped: { [key: string]: any[] } = {};

        notifications.forEach(notification => {
            const date = new Date(notification.createdAt);
            const today = new Date();
            const yesterday = new Date(today);
            yesterday.setDate(yesterday.getDate() - 1);

            let key: string;

            if (date.toDateString() === today.toDateString()) {
                key = 'Today';
            } else if (date.toDateString() === yesterday.toDateString()) {
                key = 'Yesterday';
            } else {
                key = date.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                });
            }

            if (!grouped[key]) {
                grouped[key] = [];
            }
            grouped[key].push(notification);
        });

        // Sort by date (Today, Yesterday, then others in descending order)
        const sortedKeys = Object.keys(grouped).sort((a, b) => {
            if (a === 'Today') return -1;
            if (b === 'Today') return 1;
            if (a === 'Yesterday') return -1;
            if (b === 'Yesterday') return 1;
            return new Date(b).getTime() - new Date(a).getTime();
        });

        return sortedKeys.map(key => ({
            title: key,
            data: grouped[key],
        }));
    };

    const handleMarkAsRead = async (notificationId: string): Promise<void> => {
        try {
            await markAsReadMutation(notificationId).unwrap();
            refetch();
        } catch (err) {
            console.error('Failed to mark notification as read:', err);
        }
    };

    const handleMarkAllAsRead = async (): Promise<void> => {
        try {
            await markAllAsReadMutation().unwrap();
            refetch();
        } catch (err) {
            console.error('Failed to mark all notifications as read:', err);
        }
    };

    const handleSetStatus = (status: NotificationStatus): void => {
        statusRef.current = status;
        refetch();
    };

    const notificationData = notificationsResponse?.data
        ? groupNotifications(notificationsResponse.data)
        : [];

    return {
        refs: {
            statusRef,
        },
        values: {
            notificationData,
            contentLoading,
            error,
            notificationsTotal: notificationsResponse?.total || 0,
        },
        actions: {
            markAsRead: handleMarkAsRead,
            markAllAsRead: handleMarkAllAsRead,
            setStatus: handleSetStatus,
        },
    };
};

export default useNotificationsController;