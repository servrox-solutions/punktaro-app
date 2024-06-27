// authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  userAddress: string;
  ephemeralPrivateKey: string;
  randomness: string;
  maxEpoch: string;
  salt: string;
  partialZkLoginSignature: string;
  token: string;
}

const initialState: AuthState = {
  userAddress: '',
  ephemeralPrivateKey: '',
  randomness: '',
  maxEpoch: '',
  salt: '1234',
  partialZkLoginSignature: '',
  token: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserAddress: (state, action: PayloadAction<string>) => {
      state.userAddress = action.payload;
    },
    setEphemeralPrivateKey: (state, action: PayloadAction<string>) => {
      state.ephemeralPrivateKey = action.payload;
    },
    setRandomness: (state, action: PayloadAction<string>) => {
      state.randomness = action.payload;
    },
    setMaxEpoch: (state, action: PayloadAction<string>) => {
      state.maxEpoch = action.payload;
    },
    setSalt: (state, action: PayloadAction<string>) => {
      state.salt = action.payload;
    },
    setPartialZkLoginSignature: (state, action: PayloadAction<string>) => {
      state.partialZkLoginSignature = action.payload;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
  },
});

export const {
  setUserAddress,
  setEphemeralPrivateKey,
  setRandomness,
  setMaxEpoch,
  setSalt,
  setPartialZkLoginSignature,
  setToken,
} = authSlice.actions;

export default authSlice.reducer;
