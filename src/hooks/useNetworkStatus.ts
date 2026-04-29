import { useEffect, useRef } from 'react';
import NetInfo, { NetInfoState } from '@react-native-community/netinfo';
import Toast from 'react-native-toast-message';

/**
 * Monitors network connectivity and surfaces a persistent toast when the
 * device goes offline.  When connectivity is restored, the offline toast is
 * replaced with a brief "Back Online" confirmation.
 *
 * Mount this once at the app root (via NetworkStatusMonitor in App.tsx).
 * It is purely side-effect-based and renders nothing.
 */
export const useNetworkStatus = () => {
  // null  → state not yet known
  // true  → was connected on last known state
  // false → was disconnected on last known state
  const previouslyConnected = useRef<boolean | null>(null);

  useEffect(() => {
    const handleConnectivityChange = (state: NetInfoState) => {
      const isConnected = state.isConnected;

      // NetInfo may emit null while determining initial state — ignore it
      if (isConnected === null) return;

      if (!isConnected) {
        // Device is offline — show a persistent toast until connection returns
        Toast.show({
          type: 'error',
          text1: 'No Internet Connection',
          text2: 'Please check your Wi-Fi or mobile data.',
          autoHide: false,
          position: 'top',
        });
      } else if (previouslyConnected.current === false) {
        // Connection just restored after being offline
        Toast.show({
          type: 'success',
          text1: 'Back Online',
          text2: 'Your internet connection has been restored.',
          visibilityTime: 3000,
          position: 'top',
        });
      }

      previouslyConnected.current = isConnected;
    };

    // Subscribe — NetInfo fires immediately with the current state, so this
    // covers both "offline on launch" and "toggled offline while running".
    const unsubscribe = NetInfo.addEventListener(handleConnectivityChange);

    return () => unsubscribe();
  }, []);
};
