import messaging from '@react-native-firebase/messaging';
import notifee, { AndroidImportance, EventType } from '@notifee/react-native';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { navigate } from '../utils/navigation';
import { NAVIGATORS } from '../utils/routes';

const FCM_TOKEN_KEY = '@lynx_fcm_token';

/**
 * Navigate to notifications screen
 */
const navigateToNotifications = () => {
  try {
    // Use a small delay to ensure navigation is ready, especially when app is opened from quit state
    setTimeout(() => {
      navigate(NAVIGATORS.NOTIFICATION_STACK as any);
    }, 300);
  } catch (error) {
    console.error('Error navigating to notifications:', error);
    // Retry after a longer delay if first attempt fails
    setTimeout(() => {
      try {
        navigate(NAVIGATORS.NOTIFICATION_STACK as any);
      } catch (retryError) {
        console.error('Error navigating to notifications (retry):', retryError);
      }
    }, 1000);
  }
};

/**
 * Request notification permissions
 */
export const requestNotificationPermission = async (): Promise<boolean> => {
  try {
    if (Platform.OS === 'android') {
      await notifee.requestPermission();
    } else {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;
      return enabled;
    }
    return true;
  } catch (error) {
    console.error('Error requesting notification permission:', error);
    return false;
  }
};

/**
 * Get FCM token and store it
 */
export const getFCMToken = async (): Promise<string | null> => {
  try {
    // Check if we already have a stored token
    const storedToken = await AsyncStorage.getItem(FCM_TOKEN_KEY);
    if (storedToken) {
      return storedToken;
    }

    // Request permission first
    const hasPermission = await requestNotificationPermission();
    if (!hasPermission) {
      console.warn('Notification permission not granted');
      return null;
    }

    // Get FCM token
    const token = await messaging().getToken();
    
    if (token) {
      // Store token for future use
      await AsyncStorage.setItem(FCM_TOKEN_KEY, token);
      console.log('FCM Token:', token);
      return token;
    }
    
    return null;
  } catch (error) {
    console.error('Error getting FCM token:', error);
    return null;
  }
};

/**
 * Delete FCM token
 */
export const deleteFCMToken = async (): Promise<void> => {
  try {
    await messaging().deleteToken();
    await AsyncStorage.removeItem(FCM_TOKEN_KEY);
  } catch (error) {
    console.error('Error deleting FCM token:', error);
  }
};

/**
 * Create a notification channel for Android
 */
export const createNotificationChannel = async (): Promise<string> => {
  if (Platform.OS === 'android') {
    const channelId = await notifee.createChannel({
      id: 'lynx_default',
      name: 'Lynx Notifications',
      importance: AndroidImportance.HIGH,
      sound: 'default',
      vibration: true,
    });
    return channelId;
  }
  return 'default';
};

/**
 * Display a local notification using Notifee
 */
export const displayNotification = async (
  title: string,
  body: string,
  data?: any,
): Promise<string> => {
  try {
    const channelId = await createNotificationChannel();

    const notificationId = await notifee.displayNotification({
      title,
      body,
      data,
      android: {
        channelId,
        importance: AndroidImportance.HIGH,
        pressAction: {
          id: 'default',
        },
        sound: 'default',
      },
      ios: {
        sound: 'default',
      },
    });

    return notificationId;
  } catch (error) {
    console.error('Error displaying notification:', error);
    return '';
  }
};

/**
 * Initialize notification handlers
 */
export const initializeNotifications = async (): Promise<void> => {
  try {
    // Create notification channel for Android
    await createNotificationChannel();

    // Handle foreground messages
    messaging().onMessage(async remoteMessage => {
      console.log('Foreground message received:', remoteMessage);
      
      if (remoteMessage.notification) {
        await displayNotification(
          remoteMessage.notification.title || 'New Notification',
          remoteMessage.notification.body || '',
          remoteMessage.data,
        );
      }
    });

    // Handle notification opened from quit state
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log('Notification opened app from quit state:', remoteMessage);
          navigateToNotifications();
        }
      });

    // Handle notification opened from background
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log('Notification opened app from background:', remoteMessage);
      navigateToNotifications();
    });

    // Setup Notifee event handlers
    notifee.onForegroundEvent(({ type, detail }) => {
      if (type === EventType.PRESS) {
        console.log('Notification pressed:', detail.notification);
        navigateToNotifications();
      }
    });

    notifee.onBackgroundEvent(async ({ type, detail }) => {
      if (type === EventType.PRESS) {
        console.log('Background notification pressed:', detail.notification);
        navigateToNotifications();
      }
    });

    // Get and store FCM token
    await getFCMToken();
  } catch (error) {
    console.error('Error initializing notifications:', error);
  }
};

