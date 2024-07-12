import React from 'react';
import { useState } from 'react';
import { Header } from '../../../../../components/ui/Header';
import { TabWrappedComponent } from '../../../../../components/utils/TabWrapper';
import {
  useIonViewDidEnter,
  useIonViewWillLeave,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel
} from '@ionic/react';

//fake data pour les heures d'absences
const absences = [
  { date: '30/05', time: '08h30 à 12h30', duration: 4 },
  { date: '30/05', time: '13h30 à 17h30', duration: 4 },
  { date: '15/05', time: '08h30 à 12h30', duration: 4},
  { date: '09/05', time: '08h30 à 12h30', duration: 4 },
  { date: '07/05', time: '13h30 à 17h30', duration: 4 },
  { date: '25/04', time: '08h30 à 12h30', duration: 4 },
];

 export const AbsencesTab: React.FC<TabWrappedComponent> = ({isTab}) => {
  const [visible, setVisible] = useState(false);
  useIonViewDidEnter(() => {
    setVisible(true);
  });

  useIonViewWillLeave(() => {
    setVisible(false);
  });
  const totalRetard = absences.reduce((total, retard) => total + retard.duration, 0);

  return (
    <>
       <Header title="Absences" showLogo />
      <IonContent>
        <div style={{ padding: '10px' }}>
          <div style={{ fontWeight: 'bold', fontSize: '1.2em', marginBottom: '10px' }}>
            Ces 30 derniers Jours : {totalRetard} h d'absences.
          </div>
          <IonList>
            {absences.map((absence, index) => (
              <IonItem key={index}>
                <IonLabel>
                  <h2>Abscence le  {absence.date} de {absence.time}</h2>
                  <p>{absence.duration}h manquées</p>
                </IonLabel>
              </IonItem>
            ))}
          </IonList>
        </div>
      </IonContent>
    </>
  );
};

export default AbsencesTab;