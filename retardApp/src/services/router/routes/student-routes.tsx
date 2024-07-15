import { IonIcon } from "@ionic/react";

// SVGS
import accueil from "../../../assets/svg/icons/accueil.svg";
import absence from "../../../assets/svg/icons/absences.svg";
import agenda from "../../../assets/svg/icons/agenda.svg";
import  retard  from "../../../assets/svg/icons/retards.svg";
import RetardsTab from "../../../pages/logged/students/tabs/retards/Retards";
import  AbsencesTab  from "../../../pages/logged/students/tabs/absences/Absences";
import { ExampleTab } from "../../../pages/logged/students/tabs/example/Example";
import { StudentHome } from "../../../pages/logged/students/tabs/student-home/StudentHome";
import { AppBrand } from "../../branding/branding.interfaces";
import { AppFeature } from "../../user/interfaces/app-feature.enum";
import { RouteItem } from "../interfaces/tab-item.interface";

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
    title: "Example",
    icon: <IonIcon src={agenda}></IonIcon>,
    component: ExampleTab,
    tab: "example",
    showInTabs: true,
    brand: [AppBrand.Ynov],
    feature: AppFeature.Example,
  },
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
    title: "Absences",
    icon: <IonIcon icon={absence}></IonIcon>, 
    component: AbsencesTab,
    tab: "absences",
    showInTabs: true,
    brand: [AppBrand.Ynov],
    feature: "Absences" as AppFeature,
  }
];
