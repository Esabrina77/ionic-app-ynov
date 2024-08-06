import {
  IonContent,
  useIonViewDidEnter,
  useIonViewWillLeave,
} from "@ionic/react";
import { useState } from "react";
import { Header } from "../../../../../components/ui/Header";
import { TabWrappedComponent } from "../../../../../components/utils/TabWrapper";

import "./Example.scss";

export const StudentHome: React.FC<TabWrappedComponent> = ({ isTab }) => {
  const [visible, setVisible] = useState(false);
  useIonViewDidEnter(() => {
    setVisible(true);
  });

  useIonViewWillLeave(() => {
    setVisible(false);
  });

  return (
    <>
      <Header title="Exemple" showLogo />
      <IonContent>
        <div className={`${isTab ? "tab-wrapper" : ""} student-home`}>
          <div className="student-home__swiper">
            <h2>Exemple </h2>
            <h2>Lorem ipsum, dolor sit amet </h2>
         
          </div>
          <div>
           </div>
        </div>
      </IonContent>
    </>
  );
};


export default StudentHome;