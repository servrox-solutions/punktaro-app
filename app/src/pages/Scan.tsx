import React, { useCallback, useRef, useState } from 'react';
import { IonButton, IonContent, IonHeader, IonPage, IonTitle, useIonToast } from '@ionic/react';
import Webcam from 'react-webcam';
import './Scan.css';
import { PointToolbar } from '../components/PointToolbar';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { uploadReceipt } from '../scripts/http/uploadReceipt';
import LoadingSpinner from '../components/LoadingSpinner';
import CenterContainer from '../components/CenterContainer';
import { fetchPunktaroBalance } from '../scripts/sui/use-punktaro-token';
import { setPunktaroBalance } from '../store/userSlice';

const Scan: React.FC = () => {
  const { t } = useTranslation();
  const userAddress = useSelector((state: RootState) => state.auth.userAddress);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const [present] = useIonToast();

  const webcamRef = useRef<Webcam>(null);

  const capture = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setImageSrc(imageSrc);
    }
  }, [webcamRef]);

  const showToast = (msg: string) => {
    present({
      message: msg,
      duration: 3000,
      position: 'middle',
    });
  }

  const handleUpload = async () => {
    if (!imageSrc) return;

    setIsUploading(true);

    try {
      const file = dataURLtoFile(imageSrc, 'receipt.jpg');
      const response = await uploadReceipt(file, userAddress);
      if (response.error) {
        showToast('Receipt analaysis failed. Make sure you use a valid receipt as input and the image is not blurry.');
        return;
      } else {
        showToast('Receipt upload successfull! Added points to your account.');
        fetchPunktaroBalance(userAddress as `0x${string}`).then(balance => dispatch(setPunktaroBalance(balance)));          
      }
    } catch (err: unknown) {
      console.error(err);
      showToast('Receipt analaysis failed. Make sure you use a valid receipt as input and the image is not blurry.');
    } finally {
      setIsUploading(false);
      setImageSrc(null);
    }
    // createInvoice(formData).then(res => setResponse(JSON.stringify(res))).catch(res => setResponse(JSON.stringify(res)));
  };

  const dataURLtoFile = (dataurl: string, filename: string): File => {
    const arr = dataurl.split(',');
    // @ts-ignore: @typescript-eslint/no-non-null-assertion
    const mime = arr[0].match(/:(.*?);/)![1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };


  const TakePhoto = () => {
    return (
      <>
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={{ facingMode: 'environment', height: 1000, width: 500 }}
          screenshotQuality={1}
          style={{
            left: 0,
            height: "100%",
            width: "100%",
            objectFit: "cover",
            overflow: 'hidden',
          }
          }
        />

        <IonButton expand="block"
          onClick={() => capture()}
          style={{ position: 'fixed', bottom: '10px', left: '5%', width: '90%', zIndex: 100 }}>
          {t("app.pages.scan.button.photo")}
        </IonButton>
      </>
    )
  }


  const UploadPhoto = ({ src }: { src: string }) => {
    return (
      <>
        <img src={src} />
        <IonButton expand="block"
          onClick={() => handleUpload()}
          style={{ position: 'fixed', bottom: '10px', left: '5%', width: '45%', zIndex: 100 }}>
          {t("app.pages.scan.button.submit")}
        </IonButton>
        <IonButton expand="block"
          onClick={() => setImageSrc(null)}
          style={{ position: 'fixed', bottom: '10px', left: '50%', width: '45%', zIndex: 100 }}>
          {t("app.pages.scan.button.redo")}
        </IonButton>
      </>
    )
  }


  return (
    <IonPage>
      <IonHeader>
        <PointToolbar pointLabel={t('app.header.points')}>
          <IonTitle>{t("app.pages.scan.title")}</IonTitle>
        </PointToolbar>
      </IonHeader>
      <IonContent fullscreen style={{ position: 'relative', overflow: 'hidden' }}>
        <CenterContainer >
          {isUploading ?
            <LoadingSpinner /> :
            !imageSrc ?
              <TakePhoto /> :
              <UploadPhoto src={imageSrc} />}
        </CenterContainer>
      </IonContent>
    </IonPage>
  );
};

export default Scan;
