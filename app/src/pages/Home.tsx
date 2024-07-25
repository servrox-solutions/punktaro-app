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
          <IonTitle>{t("app.pages.home.title")}</IonTitle>
        </PointToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonCard>
          <img alt="Punktaro coin" src="/assets/images/coin.png" />
          <IonCardHeader>
            <IonCardTitle>{balance} {t("app.pages.home.points")}</IonCardTitle>
            <IonCardSubtitle>{t("app.pages.home.your-points")}</IonCardSubtitle>
          </IonCardHeader>

          <IonCardContent>
            {t("app.pages.home.info")}
          </IonCardContent>

          <IonButton fill="clear" routerLink='/shop'>
            {t("app.pages.home.link.shop")}
          </IonButton>
          <IonButton fill="clear" routerLink='/scan'>
            {t("app.pages.home.link.scan")}
          </IonButton>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Home;
