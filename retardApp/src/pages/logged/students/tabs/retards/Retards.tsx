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
  const [totalRetard, setTotalRetard] = useState(0);
  const [courses, setCourses] = useState<Course[]>([]);
  const [ifRetard, setIfRetard] = useState(false);
  const [scanValid, setScanValid] = useState(false);
  const [currentCourse, setCurrentCourse] = useState<Course | null>(null);

  useIonViewDidEnter(() => {
    setVisible(true);
  });

  useIonViewWillLeave(() => {
    setVisible(false);
  });

  useEffect(() => {
    fetchCourses();
    fetchRetards();
    checkRetardAndScanValidity();
    calculateRetardDuration();

    const interval = setInterval(() => {
      checkRetardAndScanValidity();
      calculateRetardDuration();
      checkCourseEnd();
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const calculateRetardDuration = () => {
    const duration = apiCoursService.calculateRetardDuration();
    setRetardDuration(duration);
  };

  const fetchRetards = async () => {
    try {
      const etudiantId = 5578; // l'ID de l'étudiant récupéré lors du login
      const retardData = await apiService.getRetardByEtudiantId(etudiantId);
      setRetards([retardData]);

      const totalMinutes = (retardData.missedHours || 0) * 60;
      setTotalRetard(totalMinutes);
    } catch (error) {
      console.error('Error fetching retards:', error);
      setRetards([]);
      setTotalRetard(0);
    }
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const formatTime = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleTimeString();
  };

  const fetchCourses = () => {
    const courseData = apiCoursService.getCourseData();
    setCourses(courseData.courses);
  };

  //check si le cours est fini 
  const checkCourseEnd = () => {
    if (currentCourse && new Date() > new Date(currentCourse.date_fin)) {
      setIfRetard(false);
      setScanValid(true);
      setCurrentCourse(null);
    }
  };
  
  const checkRetardAndScanValidity = () => {
    const { isValid, course } = apiCoursService.checkIfScanValid();
    setScanValid(isValid);
    setCurrentCourse(course);
  
    if (course) {
      setIfRetard(true);
      if (!isValid && !scanValid) {
        markStudentAsAbsent(course);
      }
    } else {
      setIfRetard(false);
      setScanValid(true);
    }
  };
  

  const markStudentAsAbsent = async (course: Course) => {
    try {
      const etudiantId = 5578; // l'ID de l'étudiant récupéré lors du login
      await apiService.markStudentAsAbsent(course, etudiantId);
    } catch (error) {
      console.error('Error marking student as absent:', error);
    }
  };

  const router = useIonRouter();

  const goToScanQR = () => {
    router.push('/tabs/qrcode', 'forward', 'push');
  };

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
  currentCourse ? (
    <>
      <HeaderRadius>
        <IonText className="danger">
          {scanValid ? "Vous êtes en retard" : "Vous êtes absent"}
        </IonText>
      </HeaderRadius>
      <div className='tooltip'>
        <p className='retardsummary'> Votre cours
          <span className='course'> {currentCourse.description}
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
            Le temps de scan est expiré. Vous êtes marqué absent.
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
                        <span className='absence_date'> {formatDate(retard.date_debut)} </span> de
                        <span className='absence_time'> {formatTime(retard.date_debut)} à {formatTime(retard.date_fin)}</span>
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
