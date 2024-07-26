// src/pages/logged/students/tabs/retards/Retards.tsx
import React, { useState, useEffect } from 'react';
import { Header } from "../../../../../components/ui/Header";
import StatSlider from '../../../../../components/StatSlider/StatSlider';
import TabSwitcher from '../../../../../components/TabSwitcher/TabSwitcher';
import { TabWrappedComponent } from "../../../../../components/utils/TabWrapper";
import HeaderRadius from '../../../../../components/HeaderRadius/HeaderRadius';
import { apiService } from '../../../../../services/api/api.service';
import { apiCoursService } from '../../../../../services/apiCours/apiCours.service';
import { Retard } from '../../../../../services/api/api.interfaces';
import { Course } from '../../../../../services/apiCours/apiCours.interfaces';

import {
  IonContent,
  useIonViewDidEnter,
  useIonViewWillLeave,
  IonList,
  IonItem,
  IonLabel,
  useIonRouter,
  IonText
} from '@ionic/react';
import "./Retards.scss";

export const RetardsTab: React.FC<TabWrappedComponent> = ({ isTab }) => {
  const [visible, setVisible] = useState(false);
  const [currentTab, setCurrentTab] = useState<'actual' | 'cumul'>('actual');
  const [retards, setRetards] = useState<Retard[]>([]);
  const [retardDuration, setRetardDuration] = useState(0);
  const [courses, setCourses] = useState<Course[]>([]);
  const [ifRetard, setIfRetard] = useState(false);
  const [scanValid, setScanValid] = useState(false);

  useIonViewDidEnter(() => {
    setVisible(true);
  });

  useIonViewWillLeave(() => {
    setVisible(false);
  });

  useEffect(() => {
    fetchCourses();
    checkRetard();
    checkScanValidity();
    calculateRetardDuration();
  }, []);

  const fetchCourses = () => {
    const courseData = apiCoursService.getCourseData();
    setCourses(courseData.courses);
  };

  const checkRetard = () => {
    setIfRetard(apiCoursService.checkIfRetard());
  };

  const checkScanValidity = () => {
    setScanValid(apiCoursService.checkIfScanValid());
  };

  const totalRetard = retards.reduce((total, retard) => total + retard.missedHours * 60, 0);

  const router = useIonRouter();

  const goToScanQR = () => {
    router.push('/tabs/qrcode', 'forward', 'push');
  };

  const handleTabChange = (tab: string) => {
    setCurrentTab(tab as 'actual' | 'cumul');
  };

  const calculateRetardDuration = () => {
    const duration = apiCoursService.calculateRetardDuration();
    setRetardDuration(duration);
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
          ifRetard ? (
            <>
              <HeaderRadius>
                <IonText className="danger">
                  Vous êtes en retard
                </IonText>
              </HeaderRadius>
              <div className='tooltip'>
                <p className='retardsummary'> Votre cours
                  <span className='course'> {apiCoursService.getCurrentCourse()?.description || 'Cours actuel'}
                  </span> a commencé.
                </p>
                <p> Votre retard est de : <span className='danger'> {retardDuration} </span> min
                </p>
              </div>
              {scanValid ? (
                <div
                  className='btn_scanQR'
                  onClick={goToScanQR}>
                  Scanner QR Code
                </div>
              ) : (
                <HeaderRadius>
                  <IonText className="danger">
                    Le temps de scan est expiré
                  </IonText>
                </HeaderRadius>
              )}
            </>
          ) : (
            <HeaderRadius>
              <IonText>
                Vous n'êtes pas en retard
              </IonText>
            </HeaderRadius>
          )
        ) : (
          <>
            <HeaderRadius>
              <StatSlider
                period="Ces 30 derniers Jours"
                value={totalRetard}
                unit="min"
                label="de retards"
              />
            </HeaderRadius>
            <IonList>
              <div className='list-items'>
                {retards.map((retard) => (
                  <IonItem key={retard.id}>
                    <IonLabel>
                      <h2>Cours du
                        <span className='absence_date'> {new Date(retard.date_debut).toLocaleDateString()} </span> de
                        <span className='absence_time'> {new Date(retard.date_debut).toLocaleTimeString()} à {new Date(retard.date_fin).toLocaleTimeString()}</span>
                      </h2>
                      <p> Durée du retard :
                        <span className='absence_duration'> {retard.missedHours * 60} </span>
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
