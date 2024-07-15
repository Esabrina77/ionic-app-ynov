import React, { useState } from 'react';
import { Header } from "../../../../../components/ui/Header";           

import { TabWrappedComponent } from "../../../../../components/utils/TabWrapper";
import HeaderRadius from '../../../../../components/HeaderRadius/HeaderRadius';
import ScanQR from '../../../../../components/HeaderRadius/HeaderRadius';
import {
    IonContent,
    useIonViewDidEnter,
    useIonViewWillLeave,
    IonPage,
    IonItem,
    IonLabel,
    IonText
  } from '@ionic/react';

export const Scanqr: React.FC<TabWrappedComponent> = ({ isTab }) => {
    const [visible, setVisible] = useState(false);
    const [currentTab, setCurrentTab] = useState<'actual' | 'cumul'>('actual');
  
    useIonViewDidEnter(() => {
      setVisible(true);
    });
    useIonViewWillLeave(() => {
      setVisible(false);
    });
    return (
        <IonPage>
          <Header title="Scanner QR" showLogo={false} />
          <IonContent fullscreen>
            <div className="scan-qr-container">
              <h2>Scannez le code QR</h2>
              {/* Ajout du composant de scan QR */}
            </div>
          </IonContent>
        </IonPage>
      );
    };
export default Scanqr;