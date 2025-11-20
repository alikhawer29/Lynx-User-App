import { useEffect } from 'react';
import { useAppSelector } from '.';
import socketService from '../services/socket';

/**
 * Hook to manage socket connection based on auth state
 */
export const useSocket = () => {
  const user = useAppSelector(state => state.auth.user);
  const token = useAppSelector(state => state.auth.token);
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);

  useEffect(() => {
    if (isLoggedIn && user && token) {
      // Connect socket when user is logged in
      const userId = user._id || user.id;
      if (userId) {
        socketService.connect(userId, token);
      }
    } else {
      // Disconnect socket when user logs out
      socketService.disconnect();
    }

    // Cleanup on unmount
    return () => {
      // Don't disconnect on unmount, only on logout
      // socketService.disconnect();
    };
  }, [isLoggedIn, user, token]);

  return socketService;
};
