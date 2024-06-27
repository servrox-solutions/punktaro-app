// authActions.ts
import { AppDispatch, RootState } from './store';
import {
  setUserAddress,
  setPartialZkLoginSignature,
  setToken,
} from './authSlice';
import { decodeSuiPrivateKey } from '@mysten/sui/cryptography';
import { requestSuiFromFaucetV1, getFaucetHost } from '@mysten/sui/faucet';
import { Ed25519Keypair, Ed25519PublicKey } from '@mysten/sui/keypairs/ed25519';
import { jwtToAddress, getExtendedEphemeralPublicKey, genAddressSeed, getZkLoginSignature } from '@mysten/zklogin';

export const authenticateUser = (token: string) => async (dispatch: AppDispatch, getState: () => RootState) => {
  if (!token) return;
  dispatch(setToken(token));

  const state = getState().auth;
  const salt = state.salt ?? '1234';
  const privateKey = state.ephemeralPrivateKey;
  const { secretKey } = decodeSuiPrivateKey(privateKey);
  const ephemeralKeyPair = Ed25519Keypair.fromSecretKey(secretKey);
  const publicKey = ephemeralKeyPair.getPublicKey();
  const randomness = state.randomness;
  const maxEpoch = state.maxEpoch;

  const zkLoginUserAddress = jwtToAddress(token, salt);
  dispatch(setUserAddress(zkLoginUserAddress));

  const extendedEphemeralPublicKey = getExtendedEphemeralPublicKey(publicKey);

  const res = await fetch('https://prover-dev.mystenlabs.com/v1', {
    body: JSON.stringify({
      jwt: token,
      extendedEphemeralPublicKey: extendedEphemeralPublicKey,
      jwtRandomness: randomness,
      maxEpoch: maxEpoch,
      salt: salt,
      keyClaimName: 'sub',
    }),
    headers: {
      'content-type': 'application/json',
    },
    method: 'POST',
  });

  const partialZkLoginSignature = await res.text();

  if (JSON.parse(partialZkLoginSignature).error) {
    return;
  }
  dispatch(setPartialZkLoginSignature(partialZkLoginSignature));

  const s = await requestSuiFromFaucetV1({
    host: getFaucetHost('devnet'),
    recipient: zkLoginUserAddress,
  });
};
