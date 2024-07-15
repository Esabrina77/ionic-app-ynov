import React, { useState } from 'react';
import { Header } from "../../../../../components/ui/Header";
import StatSlider from '../../../../../components/StatSlider/StatSlider';
import TabSwitcher from '../../../../../components/TabSwitcher/TabSwitcher';
import { TabWrappedComponent } from "../../../../../components/utils/TabWrapper";
import {
  IonContent,
  useIonViewDidEnter,
  useIonViewWillLeave,
  IonList,
  IonItem,
  IonLabel
} from '@ionic/react';
import "./Retards.scss";

const retards = [
  { date: '30/05', time: '08h30 à 12h30', duration: 10 },
  { date: '30/05', time: '13h30 à 17h30', duration: 25 },
  { date: '15/05', time: '08h30 à 12h30', duration: 10 },
  { date: '09/05', time: '08h30 à 12h30', duration: 10 },
  { date: '07/05', time: '13h30 à 17h30', duration: 25 },
  { date: '25/04', time: '08h30 à 12h30', duration: 10 },
];

export const RetardsTab: React.FC<TabWrappedComponent> = ({ isTab }) => {
  const [visible, setVisible] = useState(false);
  const [currentTab, setCurrentTab] = useState<'actual' | 'cumul'>('actual');

  useIonViewDidEnter(() => {
    setVisible(true);
  });

  useIonViewWillLeave(() => {
    setVisible(false);
  });

  const totalRetard = retards.reduce((total, retard) => total + retard.duration, 0);

  const handleTabChange = (tab: string) => {
    setCurrentTab(tab as 'actual' | 'cumul');
  };

  return (
    <>
      <Header title="Retards" showLogo />
      <IonContent>
        <TabSwitcher 
          onTabChange={handleTabChange}
          tabs={[
            { value: 'actual', label: 'Actuel' },
            { value: 'cumul', label: 'Cumul des retards' }
          ]}
          defaultTab="actual"
        />
        {currentTab === 'actual' ? (
          <p>
            Vous êtes en retard. Veuillez scanner le code QR.
          </p>
        ) : (
          <>
            <StatSlider 
              period="Ces 30 derniers Jours"
              value={totalRetard}
              unit="min"
              label="de retards"
            />
            <IonList>
              <div className='list-items'>
                {retards.map((retard, index) => (
                  <IonItem key={index}>
                    <IonLabel>
                      <h2>Cours du 
                        <span className='absence_date'> {retard.date} </span> de
                        <span className='absence_time'> {retard.time}</span>
                      </h2>
                      <p> Durée du retard : 
                        <span className='absence_duration'> {retard.duration} </span>
                        min 
                      </p>
                    </IonLabel>
                  </IonItem>
                ))}
              </div>
            </IonList>
          </>
        )}
      </IonContent>
    </>
  );
};

export default RetardsTab;