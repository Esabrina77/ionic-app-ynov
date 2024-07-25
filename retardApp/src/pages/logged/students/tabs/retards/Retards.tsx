import React, { useState, useEffect } from 'react';
import { Header } from "../../../../../components/ui/Header";
import StatSlider from '../../../../../components/StatSlider/StatSlider';
import TabSwitcher from '../../../../../components/TabSwitcher/TabSwitcher';
import { TabWrappedComponent } from "../../../../../components/utils/TabWrapper";
import HeaderRadius from '../../../../../components/HeaderRadius/HeaderRadius';
import { apiService } from '../../../../../services/api/api.service';
import { Retard } from '../../../../../services/api/api.interfaces';

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
  const [currentRetard, setCurrentRetard] = useState<Retard | null>(null);

  useIonViewDidEnter(() => {
    setVisible(true);
  });

  useIonViewWillLeave(() => {
    setVisible(false);
  });

  useEffect(() => {
    fetchRetards();
  }, []);

  const fetchRetards = async () => {
    try {
      const data = await apiService.getRetards();
      setRetards(data);
      // Supposons que le retard actuel est le premier retard non justifié
      setCurrentRetard(data.find(retard => !retard.isJustified) || null);
    } catch (error) {
      console.error('Failed to fetch retards:', error);
    }
  };

  const totalRetard = retards.reduce((total, retard) => total + retard.missedHours * 60, 0);
  const ifRetard = currentRetard !== null;

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
          ifRetard ? (
            <>
              <HeaderRadius>
                <IonText className="danger">
                  Vous êtes en retard
                </IonText>
              </HeaderRadius>
              <div className='tooltip'>
                <p className='retardsummary'> Votre cours
                  <span className='course'> {currentRetard.missedLectures.join(', ')}
                  </span> a commencé.
                </p>
                <p> Votre retard est de : <span className='danger'> {currentRetard.missedHours * 60} </span> min
                </p>
              </div>
              <div
                className='btn_scanQR'
                onClick={goToScanQR}>
                   Scanner QR Code
              </div>
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
