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
          <IonTitle>Home</IonTitle>
        </PointToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Direkt aufs Konto</IonCardTitle>
            <IonCardSubtitle>Auszahlung</IonCardSubtitle>
          </IonCardHeader>

          <IonCardContent>
            Tausche heute deine Punkte gegen echtes Geld ein. Du erhälst die Belohnung innerhalb von 7 Werktagen direkt auf dein Konto.
            Auszahlungen sind ab einem Betrag von 2€ möglich.
          </IonCardContent>

          <IonButton expand="block" className="ion-margin">Punkte auszahlen</IonButton>
        </IonCard>

        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Tu was Gutes!</IonCardTitle>
            <IonCardSubtitle>Spende</IonCardSubtitle>
          </IonCardHeader>

          <IonCardContent>
            Spende deine Punkte und tue damit etwas gutes! Wir leiten das Geld für deine Punkte direkt an die Tierschutzorganisation weiter.
            Spenden sind ab einem Betrag von 2€ möglich.
          </IonCardContent>

          <IonButton expand="block" className="ion-margin" fill="outline" color="secondary">Punkte spenden</IonButton>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Shop;
