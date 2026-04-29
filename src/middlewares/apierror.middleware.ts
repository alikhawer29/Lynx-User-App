import { isRejectedWithValue, Middleware } from '@reduxjs/toolkit';
import Toast from 'react-native-toast-message';

const errorLogger: Middleware = () => next => action => {
  if (isRejectedWithValue(action)) {
    const payload = (action as any)?.payload;

    // FETCH_ERROR means the device had no network when the request was made.
    // The global NetworkStatusMonitor toast already tells the user they are
    // offline, so we skip the toast here to avoid duplicate/spam messages.
    if (payload?.status === 'FETCH_ERROR') {
      console.log('🔴 Network error (offline) — skipping duplicate toast');
      return next(action);
    }

    console.log('🔴 API Error Detected!');
    console.log('🔴 Action Type:', action.type);
    console.log('🔴 Full Error Action :: ', JSON.stringify(action, null, 2));

    const message =
      payload?.data?.message ||
      payload?.message ||
      (action as any)?.error?.message ||
      'Something went wrong';

    console.log('Error Message :: ', message);

    Toast.show({ text1: 'Error!', text2: message, type: 'error' });
  }

  return next(action);
};

export default errorLogger;
