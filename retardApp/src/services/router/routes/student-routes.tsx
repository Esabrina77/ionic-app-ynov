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
import  ScanQRPage  from "../../../pages/logged/students/tabs/ScanQRPage/ScanQRPage";
import { MessageScanTab } from  "../../../pages/logged/students/tabs/MessageScan/MessageScan";

//absences
 import  AbsencesTab  from "../../../pages/logged/students/tabs/absences/Absences";
import  ExampleTab  from "../../../pages/logged/students/tabs/example/Example";
import { StudentHome } from "../../../pages/logged/students/tabs/student-home/StudentHome";
import { AppBrand } from "../../branding/branding.interfaces";
import { AppFeature } from "../../user/interfaces/app-feature.enum";
import { RouteItem } from "../interfaces/tab-item.interface";

// SVGS

export const ROUTES: RouteItem[] = [
  
  {
    title: "QR CODE",
    icon: <IonIcon src={retard}></IonIcon>,
    component: ScanQRPage,
    tab: "qrcode",
    showInTabs: true,
    brand: [AppBrand.Ynov],
    feature: AppFeature.Example,
   },
  
  
  {
    title: "Accueil",
    icon: <IonIcon src={accueil}></IonIcon>,
    component: StudentHome,
    tab: "home",
    showInTabs: true,
    brand: [AppBrand.Ynov],
    feature: AppFeature.Home,
  },
  // {
  //   title: "SCanner",
  //   icon: <IonIcon src={agenda}></IonIcon>,
  //   component: ExampleTab,
  //   tab: "example",
  //   showInTabs: true,
  //   brand: [AppBrand.Ynov],
  //   feature: AppFeature.Example,
  //  },
    
   
  {
    title: "Retards",
    icon: <IonIcon icon={actualites}></IonIcon>, 
    component: MessageScanTab,
    tab: "messageScan",
    showInTabs: true,
    brand: [AppBrand.Ynov],
    feature: "messageScan" as AppFeature,
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
  {
    title: "Absences",
    icon: <IonIcon icon={absence}></IonIcon>, 
    component: AbsencesTab,
    tab: "absences",
    showInTabs: false,
    brand: [AppBrand.Ynov],
    feature: "Absences" as AppFeature,
  }
];
