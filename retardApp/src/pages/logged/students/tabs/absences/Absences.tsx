import React, { useState } from 'react';
import { Header } from '../../../../../components/ui/Header';
import { TabWrappedComponent } from '../../../../../components/utils/TabWrapper';
import TabSwitcher from '../../../../../components/TabSwitcher/TabSwitcher';
import StatSlider from '../../../../../components/StatSlider/StatSlider';
import HeaderRadius from '../../../../../components/HeaderRadius/HeaderRadius';
//svgs
import UploadIcon from '../../../../../assets/svg/icons/Group 139upload.png';
import CroixIcon from '../../../../../assets/svg/icons/signe-de-la-croix 1croix.png';
import SablierIcon from '../../../../../assets/svg/icons/Rectangle 125sablier.png';
import CheckIcon from '../../../../../assets/svg/icons/Vector (Stroke)check.png';
// Styles
import './Absences.scss';
import {
  useIonViewDidEnter,
  useIonViewWillLeave,
  IonContent,
  IonList,
  IonItem,
  useIonRouter,
  IonLabel
} from '@ionic/react';

// fake data injustify absence
const absencesInjustify = [
  { date: '30/05', time: '08h30 à 12h30', duration: 2 ,state: 'unjustified'},
  { date: '30/05', time: '13h30 à 17h30', duration: 4, state: 'treatment' },
  { date: '15/05', time: '08h30 à 12h30', duration: 4, state: 'refused' },
  { date: '09/05', time: '08h30 à 12h30', duration: 4, state: 'unjustified' },
  { date: '07/05', time: '13h30 à 17h30', duration: 4, state: 'treatment' },
  { date: '25/04', time: '08h30 à 12h30', duration: 4, state: 'refused' },
];

// fake data justify absence
const absenceJustify = [
  { date: '10/01', time: '08h30 à 12h30', duration: 7, state: 'justified' },
  { date: '20/02', time: '13h30 à 17h30', duration: 4, state: 'justified' },
  { date: '15/03', time: '08h30 à 12h30', duration: 4,  state: 'justified' },
];

//display icon by state
const displayIcon = (state: string) => {
  switch (state) {
    case 'unjustified':
      return <img src={UploadIcon} alt="Croix" />;
    case 'treatment':
      return <img src={SablierIcon} alt="Sablier" />;
    case 'refused':
      return <img src={CroixIcon} alt="Croix" />;
    case 'justified':
      return <img src={CheckIcon} alt="Check" />;
    default:
      return null;
  }
};

export const AbsencesTab: React.FC<TabWrappedComponent> = ({ isTab }) => {
  const [visible, setVisible] = useState(false);
  const [currentTab, setCurrentTab] = useState('unjustified');

  useIonViewDidEnter(() => {
    setVisible(true);
  });

  useIonViewWillLeave(() => {
    setVisible(false);
  });

  const router = useIonRouter();

  const goToJustif = () => {
    router.push('/tabs/justifs', 'forward', 'push');
  };
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
          totalAbsencesInJustify === 0 ? (
            <HeaderRadius>
              <p>Aucune absence injustifiée</p>
            </HeaderRadius>
          ) : (
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
                      {absence.state === 'unjustified' || absence.state === 'refused' ? (
                        <button onClick={goToJustif}
                        className='justify-link'>
                          {displayIcon(absence.state)}
                        </button>
                      ) : (
                        <div className='justify-link'>
                          {displayIcon(absence.state)}
                        </div>
                      )}
                    </IonItem>
                  ))}
                </div>
              </IonList>
            </>
          )
        ) : (
          totalAbsencesJustify === 0 ? (
            <HeaderRadius>
              <p>Aucune absence justifiée</p>
            </HeaderRadius>
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
                      <div
                          className='justify-link'>
                            
                      {displayIcon(absence.state)}
                        </div>
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