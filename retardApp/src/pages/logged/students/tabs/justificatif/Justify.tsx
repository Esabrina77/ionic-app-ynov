
import {
    IonContent,
    useIonViewDidEnter,
    useIonViewWillLeave,
    IonText,
    IonCard,
    IonItem,
    IonInput
  } from "@ionic/react";
  import { useState } from "react";
  import { Header } from "../../../../../components/ui/Header";
  import { TabWrappedComponent } from "../../../../../components/utils/TabWrapper";
  import TabSwitcher from '../../../../../components/TabSwitcher/TabSwitcher';
  import SelectReason from '../../../../../components/SelectReason/SelectReason';
  import AttachedFileSelector from "../../../../../components/AttachedFileSelector/AttachedFileSelector";
  

  export const JustifyTab: React.FC<TabWrappedComponent> = ({ isTab }) => {
    const [visible, setVisible] = useState(false);
    useIonViewDidEnter(() => {
      setVisible(true);
    });
  
    useIonViewWillLeave(() => {
      setVisible(false);
    });
  

    const handleTabChange = (tab: string) => {
      setCurrentTab(tab);
    };


    const [currentTab, setCurrentTab] = useState('unjustified');
    return (
      <>
        <Header title="Absence" showLogo />
        <IonContent>
          <div className={`${isTab ? "tab-wrapper" : ""} student-home`}>
            <div className="student-home__swiper">
             
              <TabSwitcher 
          onTabChange={handleTabChange}
          tabs={[
            { value: 'unjustified', label: 'Injustifiées' },
           
          ]}
          defaultTab="unjustified"
        />
            </div>
          </div>
          <form>
          <SelectReason>


                <IonText className="p">
                  Absence le 30/05 de 09h15 à 17h15
                  07h00 manqués
                </IonText>
                <IonCard className="slider">
                  <select id="monselect">
                  <option value="" selected>--Choisissez un motif--</option>
                  <option value="valeur1">Valeur 1</option>
                  <option value="valeur2" >Valeur 2</option>
                  <option value="valeur3">Valeur 3</option>
                  </select>
                </IonCard>
            
               
                <input   type="text" placeholder="Décrivez votre motif ici au besoin" ></input>
         
              </SelectReason>
              <AttachedFileSelector>
              <IonText className="p" id="attached-legend">
                  Justificatif pour  le 30/05 de 09h15 à 17h15
                  07h00 manqués
                </IonText>
                
                <input 
                type="file" id="uploader" /> 
                  <img className="attached"  id="clip"/>
              <input className="attached-photo" type="button" id="photo"/>
              
      

              </AttachedFileSelector>
              </form>
        </IonContent>
      </>
    );
  };
  