'use client';

import Link from 'next/link';
import { Provider, useDispatch } from 'react-redux';

import store, { AppDispatch, persistor } from '../_store/store';
import Logo from '../../../components/Logo';
import { SuiClient } from '@mysten/sui/client';
import { Ed25519Keypair } from '@mysten/sui/keypairs/ed25519';
import { generateRandomness, generateNonce } from '@mysten/zklogin';
import { oauthSignIn } from '../_auth/google-oauth';
import { setEphemeralPrivateKey, setRandomness, setMaxEpoch, setSalt } from '../_store/authSlice';
import LoginButton from '../../../components/LoginButton';
import { PersistGate } from 'redux-persist/integration/react';

const Login = () => {
    const dispatch = useDispatch<AppDispatch>();

    const googleSignIn = async () => {
        const FULLNODE_URL = 'https://fullnode.devnet.sui.io'; // replace with the RPC URL you want to use
        const suiClient = new SuiClient({ url: FULLNODE_URL });
        const { epoch } = await suiClient.getLatestSuiSystemState();

        const maxEpoch = Number(epoch) + 2; // this means the ephemeral key will be active for 2 epochs from now.
        const ephemeralKeyPair = new Ed25519Keypair();
        const randomness = generateRandomness();
        const nonce = generateNonce(ephemeralKeyPair.getPublicKey(), maxEpoch, randomness);

        dispatch(setEphemeralPrivateKey(ephemeralKeyPair.getSecretKey()));
        dispatch(setRandomness(randomness));
        dispatch(setMaxEpoch(maxEpoch.toString()));
        dispatch(setSalt("1234"));

        oauthSignIn(nonce);
    };

  return (
    <Provider store={store}>
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <div className="bg-card p-8 rounded shadow-md w-full max-w-sm border border-border">
          <div className="flex justify-center items-center mb-8">
            <Logo />
          </div>
        <LoginButton icon={{path: '/google-logo.svg', alt: "Google Logo"}} text="Login mit Google" handler={() => googleSignIn()} />
       
          <Link href="/member/wallet"
            className="flex items-center justify-start w-full py-4 px-6 mb-4 border border-border rounded bg-white text-textSecondary hover:bg-gray-50"
          >
            <img src="/facebook-logo.svg" alt="Facebook" className="w-8 h-8 mr-3" />
            <span className="text-lg">Sign in with Facebook</span>
          </Link>
          <Link href="/member/wallet"
            className="flex items-center justify-start w-full py-4 px-6 border border-border rounded bg-white text-textSecondary hover:bg-gray-50"
          >
            <img src="/apple-logo.svg" alt="Apple" className="w-8 h-8 mr-3" />
            <span className="text-lg">Sign in with Apple</span>
          </Link>
        </div>
      </div>
    </Provider>
  );
};

const WrappedLogin = () => (
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <Login />
        </PersistGate>
    </Provider>
);
export default WrappedLogin;

