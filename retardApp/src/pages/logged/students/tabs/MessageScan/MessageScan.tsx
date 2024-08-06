import React, { useEffect, useState } from 'react';
import { Header } from "../../../../../components/ui/Header";
import { TabWrappedComponent } from "../../../../../components/utils/TabWrapper";
import HeaderRadius from '../../../../../components/HeaderRadius/HeaderRadius';
import { useLocation } from 'react-router-dom';
import CourseGif from '../../../../../assets/anim/course.gif';
import './MessageScan.scss';
import {
  IonContent,
  useIonViewDidEnter,
  useIonViewWillLeave,
  IonImg,
  IonText
} from '@ionic/react';

const alertTime = '4min 25s';
const room = '515';

interface ScannedData {
  idStatusScan: number;
  minutesLate?: number;
}

export const MessageScanTab: React.FC<TabWrappedComponent> = ({ isTab }) => {
  const [visible, setVisible] = useState(false);
  const [scannedData, setScannedData] = useState<ScannedData | null>(null);
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const encodedData = searchParams.get('data');
    if (encodedData) {
      try {
        const decodedData = JSON.parse(decodeURIComponent(encodedData)) as ScannedData;
        setScannedData(decodedData);
      } catch (error) {
        console.error("Erreur lors du décodage des données:", error);
      }
    }
  }, [location]);

  useIonViewDidEnter(() => {
    setVisible(true);
  });

  useIonViewWillLeave(() => {
    setVisible(false);
  });

  return (
    <>
      <Header title="Retards" showLogo />
      <IonContent>
          <>
            <HeaderRadius>
              <IonText>Retard Pris en compte</IonText>
            </HeaderRadius>
            <div className='text_scan'>
              <IonText>
                Votre Retard a bien été enregistré.
                <p>Il vous reste <span className='danger'>{alertTime}</span> pour rejoindre votre salle: <span className='course'>{room}</span></p>
               </IonText>
            </div>
            <IonImg className='class_gif' src={CourseGif} alt='course gif' />
          </>
   
      </IonContent>
    </>
  );
};

export default MessageScanTab;