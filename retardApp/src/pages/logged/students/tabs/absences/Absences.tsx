import React, { useState, useEffect } from 'react';
import { Header } from '../../../../../components/ui/Header';
import { TabWrappedComponent } from '../../../../../components/utils/TabWrapper';
import TabSwitcher from '../../../../../components/TabSwitcher/TabSwitcher';
import StatSlider from '../../../../../components/StatSlider/StatSlider';
import HeaderRadius from '../../../../../components/HeaderRadius/HeaderRadius';
import { apiService } from '../../../../../services/api/api.service';
import UploadIcon from '../../../../../assets/svg/icons/Group 139upload.png';
import CheckIcon from '../../../../../assets/svg/icons/Vector (Stroke)check.png';
import { Absence } from '../../../../../services/api/api.interfaces';
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

const displayIcon = (isJustified: boolean) => {
  return isJustified ? <img src={CheckIcon} alt="Check" /> : <img src={UploadIcon} alt="upload" />;
};

export const AbsencesTab: React.FC<TabWrappedComponent> = ({ isTab }) => {
  const [visible, setVisible] = useState(false);
  const [currentTab, setCurrentTab] = useState('unjustified');
  const [absencesInjustify, setAbsencesInjustify] = useState<Absence[]>([]);
  const [absenceJustify, setAbsenceJustify] = useState<Absence[]>([]);

  useIonViewDidEnter(() => {
    setVisible(true);
    fetchAbsences();
  });

  useIonViewWillLeave(() => {
    setVisible(false);
  });

  const fetchAbsences = async () => {
    const etudiantId = 5578; // Remplacez par l'ID de l'étudiant
    try {
      const unjustifiedAbsences = await apiService.getUnjustifiedAbsences(etudiantId);
      const justifiedAbsences = await apiService.getJustifiedAbsences(etudiantId);
      setAbsencesInjustify(unjustifiedAbsences);
      setAbsenceJustify(justifiedAbsences);
    } catch (error) {
      console.error('Error fetching absences:', error);
    }
  };

  const router = useIonRouter();

  const goToJustif = (absence: Absence) => {
    const date = new Date(absence.date_debut).toLocaleDateString();
    const time = `${new Date(absence.date_debut).toLocaleTimeString()} à ${new Date(absence.date_fin).toLocaleTimeString()}`;
    const duration = absence.missedHours;
    const absenceId = absence.absence_id;
  
    const queryParams = new URLSearchParams({
      date,
      time,
      duration: duration.toString(),
      absenceId
    }).toString();
  
    router.push(`/tabs/justifs?${queryParams}`, 'forward', 'push');
  };
  

  const totalAbsencesInJustify = absencesInjustify.reduce((total, absence) => total + (absence.missedHours || 0), 0);
  const totalAbsencesJustify = absenceJustify.reduce((total, absence) => total + (absence.missedHours || 0), 0);

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
                          <span className='absence_date'> {new Date(absence.date_debut).toLocaleDateString()}</span> de
                          <span className='absence_time'> {new Date(absence.date_debut).toLocaleTimeString()} à {new Date(absence.date_fin).toLocaleTimeString()}</span>
                        </h2>
                        <p>
                          <span className='absence_duration'>{absence.missedHours}</span>h manquées
                        </p>
                      </IonLabel>
                      <button onClick={() => goToJustif(absence)} className='justify-link'>
                        {displayIcon(absence.isJustified)}
                      </button>
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
                          <span className='absence_date'> {new Date(absence.date_debut).toLocaleDateString()}</span> de
                          <span className='absence_time'> {new Date(absence.date_debut).toLocaleTimeString()} à {new Date(absence.date_fin).toLocaleTimeString()}</span>
                        </h2>
                        <p>
                          <span className='absence_duration'>{absence.missedHours}</span>h manquées
                        </p>
                      </IonLabel>
                      <div className='justify-link'>
                        {displayIcon(absence.isJustified)}
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
