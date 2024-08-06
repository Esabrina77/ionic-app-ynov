import React, { useState } from 'react';
import { Header } from "../../../../../components/ui/Header";
import StatSlider from '../../../../../components/StatSlider/StatSlider';
import TabSwitcher from '../../../../../components/TabSwitcher/TabSwitcher';
import { TabWrappedComponent } from "../../../../../components/utils/TabWrapper";
import HeaderRadius from '../../../../../components/HeaderRadius/HeaderRadius';

import {
  IonContent,
  useIonViewDidEnter,
  useIonViewWillLeave,
  IonText
} from '@ionic/react';
import "./MessageJustif.scss";




export const MessageJustif: React.FC<TabWrappedComponent> = ({ isTab }) => {
  const [visible, setVisible] = useState(false);
 
  useIonViewDidEnter(() => {
    setVisible(true);
  });
  useIonViewWillLeave(() => {
    setVisible(false);
  });

  return (
    <>
      <Header title="Justification" showLogo/>

      <IonContent>
            <HeaderRadius>
            <IonText>Absence en cours de validation</IonText>
            </HeaderRadius>

            <div className='text_scan'>
              <IonText>
              Votre justification a bien été prise en compte, votre demande sera traitée d’ici sous peu.
              </IonText>
           
            </div>
            </IonContent>
          </>
  );
};

export default MessageJustif;