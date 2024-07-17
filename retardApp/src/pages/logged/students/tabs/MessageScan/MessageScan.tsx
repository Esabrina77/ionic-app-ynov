import React, { useState } from 'react';
import { Header } from "../../../../../components/ui/Header";
import { TabWrappedComponent } from "../../../../../components/utils/TabWrapper";
import HeaderRadius from '../../../../../components/HeaderRadius/HeaderRadius';

//import of the gif
import CourseGif from '../../../../../assets/anim/course.gif';
import './MessageScan.scss';

import {
  IonContent,
  useIonViewDidEnter,
  useIonViewWillLeave,
  IonImg,
  IonText
} from '@ionic/react';

const lateDuring= 10;
const alertTime= '4min 25s';
const room= '515';

export const MessageScanTab: React.FC<TabWrappedComponent> = ({ isTab }) => {
  const [visible, setVisible] = useState(false);
  const [currentTab, setCurrentTab] = useState<'actual' | 'cumul'>('actual');

  useIonViewDidEnter(() => {
    setVisible(true);
  });
  useIonViewWillLeave(() => {
    setVisible(false);
  });
  const ifError = false;

  return (
    <>
      <Header title="Retards" showLogo />
      <IonContent>
        {
        ifError ? (
            <>
              <HeaderRadius>
                <IonText className="danger">
                  Erreur Lors du scan
                </IonText>
              </HeaderRadius>
             
              <div className='text_scan'>
  <IonText >
  veuillez réessayer de scanner le QR code
  <p>
  Si le problème persiste, veuillez contacter l'administration
  </p>
  </IonText>
 </div>


            </>
          ) : (
            <>
            <HeaderRadius>
              <IonText>
                Retard Pris en  compte 
              </IonText>
            </HeaderRadius>
 
 <div className='text_scan'>
  <IonText >
  Votre Retard a bien été enregistré.
<p>Il vous reste <span className='danger'> {alertTime} </span> pour rejoindre votre salle: <span className='course'>{room}</span>
</p>
Durée du retard: <span className='danger'>{lateDuring} </span>
  </IonText>
 </div>
            <IonImg 
              className='class_gif'
              src={CourseGif}
              alt='course gif'
              >
              </IonImg>
            </>
          )
        }
      </IonContent>
    </>
  );
};
