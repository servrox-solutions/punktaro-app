import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface StoreBonusCard {
  name: string;
  address: string;
  curStamps: number;
  maxStamps: number;
}

// Define the initial state
interface UserState {
  bonusCards: StoreBonusCard[] | null;
  suiBalance: string | null;
}

const initialState: UserState = {
  bonusCards: null,
  suiBalance: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setWallet: (state, action: PayloadAction<StoreBonusCard[]>) => {
      state.bonusCards = action.payload;
    },
    clearWallet: (state) => {
      state.bonusCards = null;
    },
    setSuiBalance: (state, action: PayloadAction<string | null>) => {
      state.suiBalance = action.payload;
    },
    clearSuiBalance: (state) => {
      state.suiBalance = null;
    },
  },
});

export const { setWallet, clearWallet, setSuiBalance, clearSuiBalance } = userSlice.actions;
export default userSlice.reducer;
