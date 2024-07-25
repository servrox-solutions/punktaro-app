import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the initial state
interface UserState {
  suiBalance: number;
  punktaroBalance: number;
}

const initialState: UserState = {
  suiBalance: 0,
  punktaroBalance: 100,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setSuiBalance: (state, action: PayloadAction<number>) => {
      state.suiBalance = action.payload;
    },
    setPunktaroBalance: (state, action: PayloadAction<number>) => {
      state.punktaroBalance = action.payload;
    },
    clearUser: () => ({...initialState}),
  },
});

export const { setSuiBalance, setPunktaroBalance, clearUser } = userSlice.actions;
export default userSlice.reducer;
