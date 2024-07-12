import { IonLabel, IonTabBar, IonTabButton } from "@ionic/react";
import { RouteItem } from "../../services/router/interfaces/tab-item.interface";

export interface TabBarProps {
  tabs: RouteItem[];
  darkMode: boolean;
}

export const TabBar: React.FC<TabBarProps> = ({ tabs, darkMode }) => {
  return (
    <IonTabBar
      slot="bottom"
      className="tab-bar"
      style={{
        boxShadow: `0px 0px 20px 0px ${
          darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.3)"
        }`,
      }}
    >
      {tabs
        .filter((tabItem) => tabItem.showInTabs)
        .map((tabItem) => (
          <IonTabButton
            tab={tabItem.tab}
            href={`/tabs/${tabItem.tab}`}
            key={tabItem.tab}
          >
            {tabItem.icon}
            <IonLabel>{tabItem.title}</IonLabel>
          </IonTabButton>
        ))}
    </IonTabBar>
  );
};
