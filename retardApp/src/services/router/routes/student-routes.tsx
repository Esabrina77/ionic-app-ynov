import { IonIcon } from "@ionic/react";

// SVGS
import accueil from "../../../assets/svg/icons/accueil.svg";
import absence from "../../../assets/svg/icons/absences.svg";
import agenda from "../../../assets/svg/icons/agenda.svg";
import actualites from "../../../assets/svg/icons/actualites.svg";
import  retard  from "../../../assets/svg/icons/retards.svg";

//import des pages 
//::::RETARD::::SCAN:::JUSTIF RETARD::MESSAGE SCAN
import RetardsTab from "../../../pages/logged/students/tabs/retards/Retards";
//scan du code QR
import ScanTab from "../../../pages/logged/students/tabs/scanQr/ScanPage"
//justif retard
import { LateJustify } from "../../../pages/logged/students/tabs/lateJustify/LateJustify";
//message apres scan
import { MessageScanTab } from  "../../../pages/logged/students/tabs/MessageScan/MessageScan";
//:
//ABSENCES::: JUSTIFICATIF::::: MESSAGE JUSTIF 
//absences
 import  AbsencesTab  from "../../../pages/logged/students/tabs/absences/Absences";
import { MessageJustif } from  "../../../pages/logged/students/tabs/MessageJustif/MessageJustif";
//import justificatif
import { JustifyTab } from "../../../pages/logged/students/tabs/justificatif/Justify";


import  ExampleTab  from "../../../pages/logged/students/tabs/example/Example";
import { StudentHome } from "../../../pages/logged/students/tabs/student-home/StudentHome";
import { AppBrand } from "../../branding/branding.interfaces";
import { AppFeature } from "../../user/interfaces/app-feature.enum";
import { RouteItem } from "../interfaces/tab-item.interface";
import { qrCode } from "ionicons/icons";

//import Décharge de Sortie
import { DechargeSortieForm } from "../../../pages/logged/students/tabs/dechargesSorties/form";

// SVGS

export const ROUTES: RouteItem[] = [
  
  
  {
    title: "Accueil",
    icon: <IonIcon src={accueil}></IonIcon>,
    component: StudentHome,
    tab: "home",
    showInTabs: true,
    brand: [AppBrand.Ynov],
    feature: AppFeature.Home,
  },


  {
    title: "decharge",
    icon: <IonIcon src={accueil}></IonIcon>,
    component: DechargeSortieForm,
    tab: "decharge",
    showInTabs: true,
    brand: [AppBrand.Ynov],
    feature: AppFeature.Home,
  },
  // {
  //   title: "Exemple",
  //   icon: <IonIcon src={agenda}></IonIcon>,
  //   component: ExampleTab,
  //   tab: "example",
  //   showInTabs: true,
  //   brand: [AppBrand.Ynov],
  //   feature: AppFeature.Example,
  //  },
  
  {
    title: "Exemple",
    icon: <IonIcon src={agenda}></IonIcon>,
    component: ExampleTab,
    tab: "example",
    showInTabs: true,
    brand: [AppBrand.Ynov],
    feature: AppFeature.Example,
   },
  
 ///////////RETARD|  SCAN |  MESSAGE DU SCAN/////////////////
  {
    title: "Retards",
    icon: <IonIcon icon={retard}></IonIcon>, 
    component: RetardsTab,
    tab: "retards",
    showInTabs: true,
    brand: [AppBrand.Ynov],
    feature: "Retards" as AppFeature,
  },
  {
    title: "ScanPage",
    icon: <IonIcon icon={retard}></IonIcon>, 
    component: ScanTab,
    tab: "qrcode",
    showInTabs: false,
    brand: [AppBrand.Ynov],
    feature: "ScanPage" as AppFeature,
  },
  {
    title: "JustifyLate",
    icon: <IonIcon icon={retard}></IonIcon>, 
    component: LateJustify,
    tab: "justify-late",
    showInTabs: false,
    brand: [AppBrand.Ynov],
    feature: "JustifyLate" as AppFeature,
  },
  {
    title: "MessageScan",
    icon: <IonIcon icon={retard}></IonIcon>, 
    component: MessageScanTab,
    tab: "message_scan",
    showInTabs: false,
    brand: [AppBrand.Ynov],
    feature: "MessageScan" as AppFeature,
  },


  /////////////ABSENCES | JUSTIFICATION |MESSAGE DE JUSTIFICATION  //////////////
  //absence
  {
    title: "Absences",
    icon: <IonIcon icon={absence}></IonIcon>, 
    component: AbsencesTab,
    tab: "absences",
    showInTabs: true,
    brand: [AppBrand.Ynov],
    feature: "Absences" as AppFeature,
  },
  //formilaire de justification
  {
    title: "JustifAbsence",
    icon: <IonIcon icon={absence}></IonIcon>, 
    component: JustifyTab,
    tab: "justifs",
    showInTabs: false,
    brand: [AppBrand.Ynov],
    feature: "Absences" as AppFeature,
  },
  //message de justification
  {
    title: "MessageJustif",
    icon: <IonIcon icon={absence}></IonIcon>, 
    component: MessageJustif,
    tab: "message_justif",
    showInTabs: false,
    brand: [AppBrand.Ynov],
    feature: "MessageJustif" as AppFeature,
  }
];