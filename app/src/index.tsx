import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import i18next from "i18next";
import common_de from "./translations/de/translation.json";
import common_en from "./translations/en/translation.json";
import { I18nextProvider } from 'react-i18next';
import { isPlatform, setupIonicReact } from '@ionic/react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './store/store';

i18next.init({
  interpolation: { escapeValue: false },  // React already does escaping
  lng: 'en',
  resources: {
    de: {
      translation: common_de
    },
    en: {
      translation: common_en
    }
  }
});

setupIonicReact({
  mode: isPlatform('ios') ? 'ios' : 'md',
  
});

const container = document.getElementById('root');
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18next}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </I18nextProvider>
  </React.StrictMode >
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
