import React from 'react';
import { IonAccordion, IonAccordionGroup, IonButton, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList, IonPage, IonTitle } from '@ionic/react';
import './Home.css';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { logoutUser } from '../store/authActions';
import { useHistory } from 'react-router';
import { PointToolbar } from '../components/PointToolbar';
import { useTranslation } from 'react-i18next';

const Account: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const history = useHistory();
  const { t } = useTranslation();

  const userAddress = useSelector((state: RootState) => state.auth.userAddress);
  const logout = () => {
    dispatch(logoutUser());
    history.push('/');
  };

  return (
    <IonPage>
      <IonHeader>
        <PointToolbar pointLabel={t('app.header.points')}>
          <IonTitle>Account</IonTitle>
        </PointToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className={'ion-padding-horizontal'}>
          <h1>Einstellungen</h1>
        </div>
        <IonAccordionGroup>
          <IonAccordion value="first">
            <IonItem slot="header" color="light">
              <IonLabel>Persönliche Daten</IonLabel>
            </IonItem>
            <div slot='content'>
              <IonList>
                <IonItem>
                  <div className="ion-padding-vertical">Bei einer Auszahlung müssen die Bankdaten stimmen. Auszahlungen sind nur auf deutsche Kontos möglich.</div>
                </IonItem>
                <IonItem>
                  <IonInput label="IBAN" placeholder='DEXX XXXX XXXX XXXX XXXX'></IonInput>
                </IonItem>
                <IonItem>
                  <IonInput label="BIC" placeholder='XXXXXXXXXXX'></IonInput>
                </IonItem>
              </IonList>
              <IonButton expand='block' className='ion-margin'>Speichern</IonButton>
            </div>
          </IonAccordion>
          <IonAccordion value="second">
            <IonItem slot="header" color="light">
              <IonLabel>Weitere Daten</IonLabel>
            </IonItem>

            <IonList slot='content'>
              <IonItem>
                <IonInput label="Einzigartige Adresse" readonly value={userAddress}></IonInput>
              </IonItem>
            </IonList>
          </IonAccordion>
        </IonAccordionGroup>
        <IonButton expand="block" fill='clear' color='secondary' onClick={() => logout()}>Logout</IonButton>

      </IonContent>

    </IonPage>
  );
};

export default Account;
