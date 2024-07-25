import React from 'react';
import { IonToolbar, IonButton} from '@ionic/react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

export interface PointToolbarProps {
    children: React.ReactNode,
    pointLabel: string
}

export const PointToolbar: React.FC<PointToolbarProps> = ({children, pointLabel}: PointToolbarProps) => {
    const userBalance = useSelector((state: RootState) => state.user.punktaroBalance);
    
    return (
        <IonToolbar>
            {children}
            <IonButton fill="outline" slot="end" size="small" routerLink='/home'>{userBalance} {pointLabel}</IonButton>
        </IonToolbar>
    );
}