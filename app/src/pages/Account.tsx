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
          <IonTitle>{t("app.pages.account.title")}</IonTitle>
        </PointToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className={'ion-padding-horizontal'}>
          <h1>{t("app.pages.account.headline")}</h1>
        </div>
        <IonAccordionGroup>
          <IonAccordion value="first">
            <IonItem slot="header" color="light">
              <IonLabel>{t("app.pages.account.accordion.personal-data")}</IonLabel>
            </IonItem>
            <div slot='content'>
              <IonList>
                <IonItem>
                  <div className="ion-padding-vertical">{t("app.pages.account.accordion.personal-data.info")}</div>
                </IonItem>
                <IonItem>
                  <IonInput label="IBAN" placeholder='DEXX XXXX XXXX XXXX XXXX'></IonInput>
                </IonItem>
                <IonItem>
                  <IonInput label="BIC" placeholder='XXXXXXXXXXX'></IonInput>
                </IonItem>
              </IonList>
              <IonButton expand='block' className='ion-margin'>{t("app.pages.account.accordion.personal-data.save")}</IonButton>
            </div>
          </IonAccordion>
          <IonAccordion value="second">
            <IonItem slot="header" color="light">
              <IonLabel>{t("app.pages.account.accordion.other-data")}</IonLabel>
            </IonItem>

            <IonList slot='content'>
              <IonItem>
                <IonInput label={t("app.pages.account.accordion.other-data.unique-address.placeholder")} readonly value={userAddress}></IonInput>
              </IonItem>
            </IonList>
          </IonAccordion>
        </IonAccordionGroup>
        <IonButton expand="block" fill='clear' color='secondary' onClick={() => logout()}>{t("app.pages.account.accordion.logout")}</IonButton>

      </IonContent>

    </IonPage>
  );
};

export default Account;
