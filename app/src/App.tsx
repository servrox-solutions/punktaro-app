import React, { useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { cashOutline, homeOutline, personOutline, scanOutline } from 'ionicons/icons';
import { usePunktaroBalance } from './scripts/sui/use-punktaro-token';
import { setPunktaroBalance } from './store/userSlice';
import { AppDispatch } from './store/store';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Scan from './pages/Scan';
import Account from './pages/Account';
import Login from './pages/Login';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import { useTranslation } from "react-i18next";

/* Custom CSS */
import "./App.css";

/* Theme variables */
import './theme/variables.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store/store';
import Auth from './pages/Auth';

setupIonicReact();

const App: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();

  // read store variables
  const userAddress = useSelector((state: RootState) => state.auth.userAddress);
  
  // side effects
  const punktaroBalance = usePunktaroBalance(userAddress as `0x${string}`);

  useEffect(() => {
    dispatch(setPunktaroBalance(punktaroBalance));
  }, [punktaroBalance, userAddress]);

  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs className='fade-in-not-out'>
          <IonRouterOutlet>
            <Route exact path="/">
              <Login />
            </Route>
            <Route exact path="/auth">
              <Auth />
            </Route>
            <Route exact path="/home">
              <Home />
            </Route>
            <Route exact path="/scan">
              <Scan />
            </Route>
            <Route exact path="/shop">
              <Shop />
            </Route>
            <Route exact path="/account">
              <Account />
            </Route>
            <Redirect to="/home" />
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="home" href="/home">
              <IonIcon aria-hidden="true" icon={homeOutline} />
              <IonLabel>{t('app.menu.item.home')}</IonLabel>
            </IonTabButton>
            <IonTabButton tab="scan" href="/scan">
              <IonIcon aria-hidden="true" icon={scanOutline} />
              <IonLabel>{t('app.menu.item.scan')}</IonLabel>
            </IonTabButton>
            <IonTabButton tab="shop" href="/shop">
              <IonIcon aria-hidden="true" icon={cashOutline} />
              <IonLabel>{t('app.menu.item.shop')}</IonLabel>
            </IonTabButton>
            <IonTabButton tab="account" href="/account">
              <IonIcon aria-hidden="true" icon={personOutline} />
              <IonLabel>{t('app.menu.item.account')}</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
}
export default App;
