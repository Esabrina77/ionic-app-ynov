import React, { useState } from 'react';
import { Header } from '../../../../../components/ui/Header';
import { TabWrappedComponent } from '../../../../../components/utils/TabWrapper';
import TabSwitcher from '../../../../../components/TabSwitcher/TabSwitcher';
import StatSlider from '../../../../../components/StatSlider/StatSlider';
import HeaderRadius from '../../../../../components/HeaderRadius/HeaderRadius';
import './Absences.scss';
import {
  useIonViewDidEnter,
  useIonViewWillLeave,
  IonContent,
  IonList,
  IonItem,
  IonLabel
} from '@ionic/react';

// fake data injustify absence
const absencesInjustify = [
  { date: '30/05', time: '08h30 à 12h30', duration: 4 },
  { date: '30/05', time: '13h30 à 17h30', duration: 4 },
  { date: '15/05', time: '08h30 à 12h30', duration: 4},
  { date: '09/05', time: '08h30 à 12h30', duration: 4 },
  { date: '07/05', time: '13h30 à 17h30', duration: 4 },
  { date: '25/04', time: '08h30 à 12h30', duration: 4 },
];

// fake data justify absence
const absenceJustify = [
  { date: '10/01', time: '08h30 à 12h30', duration: 0 },
  { date: '20/02', time: '13h30 à 17h30', duration: 0 },
  { date: '15/03', time: '08h30 à 12h30', duration: 0},
];

export const AbsencesTab: React.FC<TabWrappedComponent> = ({isTab}) => {
  const [visible, setVisible] = useState(false);
  const [currentTab, setCurrentTab] = useState('unjustified');

  useIonViewDidEnter(() => {
    setVisible(true);
  });

  useIonViewWillLeave(() => {
    setVisible(false);
  });

  const totalAbsencesInJustify = absencesInjustify.reduce((total, absence) => total + absence.duration, 0);
  const totalAbsencesJustify = absenceJustify.reduce((total, absence) => total + absence.duration, 0);

  const handleTabChange = (tab: string) => {
    setCurrentTab(tab);
  };

  return (
    <>
      <Header title="Absences" showLogo />
      <IonContent>
        <TabSwitcher 
          onTabChange={handleTabChange}
          tabs={[
            { value: 'unjustified', label: 'Injustifiées' },
            { value: 'justified', label: 'Justifiées' }
          ]}
          defaultTab="unjustified"
        />
        {currentTab === 'unjustified' ? (
          <>
            <HeaderRadius>
              <StatSlider 
                period="Total d'absences injustifiées"
                value={totalAbsencesInJustify}
                unit="h"
                label="d'absences"
              />
            </HeaderRadius>
            <IonList>
              <div className='list-items'>
                {absencesInjustify.map((absence, index) => (
                  <IonItem key={index}>
                    <IonLabel>
                      <h2>Absence le  
                        <span className='absence_date'> {absence.date}</span> de
                        <span className='absence_time'> {absence.time}</span>
                      </h2>
                      <p>
                        <span className='absence_duration'>{absence.duration}</span>h manquées
                      </p>
                    </IonLabel>
                  </IonItem>
                ))}
              </div>
            </IonList>
          </>
        ) : (
          totalAbsencesJustify === 0 ? (
            <p>Vous n'avez pas d'absences justifiées</p>
          ) : (
            <>
              <HeaderRadius>
                <StatSlider 
                  period="Total d'absences justifiées"
                  value={totalAbsencesJustify}
                  unit="h"
                  label="d'absences"
                />
              </HeaderRadius>
              <IonList>
                <div className='list-items'>
                  {absenceJustify.map((absence, index) => (
                    <IonItem key={index}>
                      <IonLabel>
                        <h2>Absence le  
                          <span className='absence_date'> {absence.date}</span> de
                          <span className='absence_time'> {absence.time}</span>
                        </h2>
                        <p>
                          <span className='absence_duration'>{absence.duration}</span>h manquées
                        </p>
                      </IonLabel>
                    </IonItem>
                  ))}
                </div>
              </IonList>
            </>
          )
        )}
      </IonContent>
    </>
  );
};

export default AbsencesTab;