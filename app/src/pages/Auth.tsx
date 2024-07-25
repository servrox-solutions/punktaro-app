import React, { useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Home.css';
import { useDispatch, useSelector } from 'react-redux';
import { authenticateUser } from '../store/authActions';
import { AppDispatch, RootState } from '../store/store';
import CenterContainer from '../components/CenterContainer';
import LoadingSpinner from '../components/LoadingSpinner';
import { useHistory } from 'react-router';

const Auth: React.FC = () => {
    const history = useHistory();
    const dispatch = useDispatch<AppDispatch>();
    const partialZkLoginSignature = useSelector((state: RootState) => state.auth.partialZkLoginSignature);



    useEffect(() => {
        const hash = window.location.hash.substring(1);
        if (!hash || !dispatch) {
            return;
        }
        const params = new URLSearchParams(hash);
        const token = params.get('id_token');
        if (!token) {
            return;
        }

        dispatch(authenticateUser(token));
    }, [dispatch]);

    useEffect(() => {
        if (!partialZkLoginSignature) {
            return;
        }
        history.replace('/home');
    }, [partialZkLoginSignature]);
    
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Bitte warten...</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <CenterContainer>
                    <LoadingSpinner />
                </CenterContainer>
            </IonContent>

        </IonPage>
    );
};

export default Auth;
