import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import errorLogger from '../../middlewares/apierror.middleware';
import successLogger from '../../middlewares/apisuccess.middleware';
import { authApi } from '../Apis/Auth';
import { bookingApi } from '../Apis/Booking';
import { chatbotApi } from '../Apis/Chatbot';
import { contentApi } from '../Apis/Content';
import { feedbackApi } from '../Apis/Feedback';
import { generalApi } from '../Apis/General';
import { serviceApi } from '../Apis/Service';
import { slotApi } from '../Apis/Slot';
import { userApi } from '../Apis/User';
import authReducer from '../Slices/AuthSlice';
import spotifyReducer from '../Slices/SpotifySlice';

const persistConfig = {
  key: 'lynx',
  storage: AsyncStorage,
  whitelist: ['auth'],
};

const rootReducer = combineReducers({
  auth: authReducer,
  spotify: spotifyReducer,
  [authApi.reducerPath]: authApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [chatbotApi.reducerPath]: chatbotApi.reducer,
  [serviceApi.reducerPath]: serviceApi.reducer,
  [feedbackApi.reducerPath]: feedbackApi.reducer,
  [generalApi.reducerPath]: generalApi.reducer,
  [contentApi.reducerPath]: contentApi.reducer,
  [slotApi.reducerPath]: slotApi.reducer,
  [bookingApi.reducerPath]: bookingApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(authApi.middleware)
      .concat(userApi.middleware)
      .concat(chatbotApi.middleware)
      .concat(serviceApi.middleware)
      .concat(feedbackApi.middleware)
      .concat(generalApi.middleware)
      .concat(contentApi.middleware)
      .concat(slotApi.middleware)
      .concat(bookingApi.middleware)
      .concat(errorLogger)
      .concat(successLogger),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
