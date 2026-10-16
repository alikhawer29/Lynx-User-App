import { isRejectedWithValue, Middleware } from '@reduxjs/toolkit';
import Toast from 'react-native-toast-message';

const errorLogger: Middleware = () => next => action => {
  if (isRejectedWithValue(action)) {
    const payload = (action as any)?.payload;

    // FETCH_ERROR = request never got a response (DNS/SSL/timeout/firewall).
    // This is NOT always "device offline" — e.g. Wi‑Fi connected but API blocked.
    if (payload?.status === 'FETCH_ERROR') {
      console.log('🔴 Network/FETCH_ERROR:', payload?.error || payload);
      Toast.show({
        text1: 'Connection Error',
        text2:
          'Unable to reach the server. Check your internet connection or try mobile data.',
        type: 'error',
      });
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
