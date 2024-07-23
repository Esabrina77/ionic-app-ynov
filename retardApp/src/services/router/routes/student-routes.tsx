import { IonIcon } from "@ionic/react";

// SVGS
import accueil from "../../../assets/svg/icons/accueil.svg";
import absence from "../../../assets/svg/icons/absences.svg";
import agenda from "../../../assets/svg/icons/agenda.svg";
import actualites from "../../../assets/svg/icons/actualites.svg";
import  retard  from "../../../assets/svg/icons/retards.svg";

//import des pages 
//retard & scan page   message confirmation || echec scan
import RetardsTab from "../../../pages/logged/students/tabs/retards/Retards";
import { MessageScanTab } from  "../../../pages/logged/students/tabs/MessageScan/MessageScan";
import ScanTab from "../../../pages/logged/students/tabs/scanQr/ScanPage"
//absences
 import  AbsencesTab  from "../../../pages/logged/students/tabs/absences/Absences";
import  ExampleTab  from "../../../pages/logged/students/tabs/example/Example";

//import justificatif
import { JustifyTab } from "../../../pages/logged/students/tabs/justificatif/Justify";
import { StudentHome } from "../../../pages/logged/students/tabs/student-home/StudentHome";
import { AppBrand } from "../../branding/branding.interfaces";
import { AppFeature } from "../../user/interfaces/app-feature.enum";
import { RouteItem } from "../interfaces/tab-item.interface";

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
    title: "QR test",
    icon: <IonIcon src={actualites}></IonIcon>,
    component:ScanTab ,
    tab: "qrcode",
    showInTabs: true,
    brand: [AppBrand.Ynov],
    feature: AppFeature.Example,
   },
   
  {
    title: "alert",
    icon: <IonIcon icon={actualites}></IonIcon>, 
    component: MessageScanTab,
    tab: "messageScan",
    showInTabs: true,
    brand: [AppBrand.Ynov],
    feature: "messageScan" as AppFeature,
  },
  {
    title: "Justificatif",
    icon: <IonIcon icon={retard}></IonIcon>, 
    component: JustifyTab,
    tab: "justifs",
    showInTabs: true,
    brand: [AppBrand.Ynov],
    feature: "Justificatif" as AppFeature,
  },
 
  // {
  //   title: "Retards",
  //   icon: <IonIcon icon={retard}></IonIcon>, 
  //   component: RetardsTab,
  //   tab: "retards",
  //   showInTabs: true,
  //   brand: [AppBrand.Ynov],
  //   feature: "Retards" as AppFeature,
  // },
  // {
  //   title: "Absences",
  //   icon: <IonIcon icon={absence}></IonIcon>, 
  //   component: AbsencesTab,
  //   tab: "absences",
  //   showInTabs: false,
  //   brand: [AppBrand.Ynov],
  //   feature: "Absences" as AppFeature,
  // }
];
