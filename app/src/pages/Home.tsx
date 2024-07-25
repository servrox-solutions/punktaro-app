import React from 'react';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonPage, IonTitle } from '@ionic/react';
import './Home.css';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { PointToolbar } from '../components/PointToolbar';
import { useTranslation } from 'react-i18next';

const Home: React.FC = () => {
  const balance = useSelector((state: RootState) => state.user.punktaroBalance);
  const { t } = useTranslation();

  return (
    <IonPage>
      <IonHeader>
        <PointToolbar pointLabel={t('app.header.points')}>
          <IonTitle>Home</IonTitle>
        </PointToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonCard>
          <img alt="Punktaro coin" src="/assets/images/coin.png" />
          <IonCardHeader>
            <IonCardTitle>{balance} Punkte</IonCardTitle>
            <IonCardSubtitle>Dein Punktestand:</IonCardSubtitle>
          </IonCardHeader>

          <IonCardContent>
            Du kannst durch das Scannen von Kassenbelegen Punkte sammeln und diese gegen tolle Belohnungen eintauschen.
          </IonCardContent>

          <IonButton fill="clear" routerLink='/shop'>
            Zum Shop
          </IonButton>
          <IonButton fill="clear" routerLink='/scan'>
            Scannen
          </IonButton>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Home;
