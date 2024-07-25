import React from 'react';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonPage, IonTitle } from '@ionic/react';
import './Shop.css';
// import { usePunktaroBalance } from '../scripts/sui/use-punktaro-token';
import { PointToolbar } from '../components/PointToolbar';
import { useTranslation } from 'react-i18next';

const Shop: React.FC = () => {
  const {t} = useTranslation();
  
  return (
    <IonPage>
      <IonHeader>
        <PointToolbar pointLabel={t('app.header.points')}>
          <IonTitle>{t("app.pages.shop.title")}</IonTitle>
        </PointToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>{t("app.pages.shop.bank-account.headline")}</IonCardTitle>
            <IonCardSubtitle>{t("app.pages.shop.bank-account.subtitle")}</IonCardSubtitle>
          </IonCardHeader>

          <IonCardContent>
            {t("app.pages.shop.bank-account.info")}
          </IonCardContent>

          <IonButton disabled expand="block" className="ion-margin">{t("app.pages.shop.bank-account.submit")}</IonButton>
        </IonCard>

        <IonCard>
          <IonCardHeader>
            <IonCardTitle>{t("app.pages.shop.donate.headline")}</IonCardTitle>
            <IonCardSubtitle>{t("app.pages.shop.donate.subtitle")}</IonCardSubtitle>
          </IonCardHeader>

          <IonCardContent>
            {t("app.pages.shop.donate.info")}
          </IonCardContent>

          <IonButton disabled expand="block" className="ion-margin" fill="outline" color="secondary">{t("app.pages.shop.donate.submit")}</IonButton>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Shop;
