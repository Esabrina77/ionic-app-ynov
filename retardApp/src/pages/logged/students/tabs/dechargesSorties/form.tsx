import React, { useState } from "react";
import {
  IonContent,
  IonText
} from "@ionic/react";
import { Header } from "../../../../../components/ui/Header";
import SelectReason from '../../../../../components/SelectReason/SelectReason';
import Signature from "../../../../../components/Signature/Signature";
import "./form.scss";

export const DechargeSortieForm: React.FC = () => {
  const [isTab, setIsTab] = useState(false);
  const handleTabChange = (tab: string) => {
    setCurrentTab(tab);
  };

  const [currentTab, setCurrentTab] = useState("decharge");
  return (
    <>
      <Header title="Décharge de Sortie" showLogo />
      <IonContent>
        <div className={`${isTab ? "tab-wrapper" : ""} student-home`}>
          <div className="student-home__swiper"></div>
        </div>
        <form>
          <div className="SelectReason">
            <SelectReason>
              <IonText className="p">
                Description du Motif
              </IonText>
              <input type="text" placeholder="Décrivez votre motif ici" />
            </SelectReason>
          </div>
          <div className="Signature">
            <Signature />
          </div>
        </form>
      </IonContent>
    </>
  );
};
