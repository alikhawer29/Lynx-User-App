import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ChatState {
  totalUnreadCount: number;
}

const initialState: ChatState = {
  totalUnreadCount: 0,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setTotalUnreadCount(state, action: PayloadAction<number>) {
      state.totalUnreadCount = action.payload;
    },
    incrementUnreadCount(state) {
      state.totalUnreadCount += 1;
    },
  },
});

export const { setTotalUnreadCount, incrementUnreadCount } = chatSlice.actions;

export const selectTotalUnreadCount = (state: any): number =>
  state.chat?.totalUnreadCount ?? 0;

export default chatSlice.reducer;
