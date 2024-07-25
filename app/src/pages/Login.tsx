import React, { useState } from 'react';
import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import './Login.css';
import { Ed25519Keypair } from '@mysten/sui/keypairs/ed25519';
import { generateRandomness, generateNonce } from '@mysten/zklogin';
import { setEphemeralPrivateKey, setRandomness, setMaxEpoch, setSalt } from '../store/authSlice';
import { AppDispatch } from '../store/store';
import { SuiClient } from '@mysten/sui/client';
import { useDispatch } from 'react-redux';
import { oauthSignIn } from '../scripts/auth/google-oauth';
import CenterContainer from '../components/CenterContainer';
import Logo from '../components/Logo';
import LoadingSpinner from '../components/LoadingSpinner';
import { useTranslation } from 'react-i18next';

const Login: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  const login = (provider: 'apple' | 'google' | 'facebook') => {
    setIsLoading(true);

    const loginFunction: { [key in typeof provider]: () => void } = {
      'apple': googleSignIn,
      'google': googleSignIn,
      'facebook': googleSignIn,
    };

    loginFunction[provider]();
  }

  const googleSignIn = async () => {
    const suiClient = new SuiClient({ url: process.env.REACT_APP_SUI_API_ENDPOINT ?? '' });
    const { epoch } = await suiClient.getLatestSuiSystemState();

    const maxEpoch = Number(epoch) + 2; // this means the ephemeral key will be active for 2 epochs from now.
    const ephemeralKeyPair = new Ed25519Keypair();
    const randomness = generateRandomness();
    const nonce = generateNonce(ephemeralKeyPair.getPublicKey(), maxEpoch, randomness);

    dispatch(setEphemeralPrivateKey(ephemeralKeyPair.getSecretKey()));
    dispatch(setRandomness(randomness));
    dispatch(setMaxEpoch(maxEpoch.toString()));
    dispatch(setSalt("12345678901234567890"));

    oauthSignIn(nonce);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <CenterContainer>
          {isLoading ? <LoadingSpinner /> : (
            <IonGrid>
              <IonRow class="ion-justify-content-start ion-padding-vertical">
                <IonCol size="8" offset="2">
                  <Logo />
                </IonCol>
              </IonRow>
              <IonRow class="ion-justify-content-start">
                <IonCol>
                  <IonButton expand='block' fill='outline' className='ion-margin-vertical' onClick={() => { login('google') }}>
                    <IonIcon slot="start" ios={'/assets/icon/google-logo.svg'} md={'/assets/icon/apple-logo.svg'}></IonIcon>
                    {t("app.pages.login.login-google")}
                  </IonButton>
                </IonCol>
              </IonRow>
              <IonRow class="ion-justify-content-start">
                <IonCol>
                  <IonButton disabled expand='block' fill='outline' onClick={() => { login('facebook') }}>
                    <IonIcon slot="start" ios={'/assets/icon/facebook-logo.svg'} md={'/assets/icon/apple-logo.svg'}></IonIcon>
                    {t("app.pages.login.login-facebook")}
                  </IonButton>
                </IonCol>
              </IonRow>
              <IonRow class="ion-justify-content-start">
                <IonCol>
                  <IonButton disabled expand='block' fill='outline' onClick={() => { login('apple') }}>
                    <IonIcon slot="start" ios={'/assets/icon/apple-logo.svg'} md={'/assets/icon/apple-logo.svg'}></IonIcon>
                    {t("app.pages.login.login-apple")}
                  </IonButton>
                </IonCol>
              </IonRow>
            </IonGrid>
          )
          }
        </CenterContainer>
      </IonContent>
    </IonPage >
  );
};

export default Login;
