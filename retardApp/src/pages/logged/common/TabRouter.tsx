import {
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import { Redirect, Route } from "react-router";
import { TabWrapper } from "../../../components/utils/TabWrapper";
import { ROUTES } from "../../../services/router/routes/student-routes";
import ScanPage from '../../../pages/logged/students/tabs/scanQr/ScanPage';
import MessageScanTab from '../../../pages/logged/students/tabs/MessageScan/MessageScan';

export const TabRouter: React.FC = () => {
  return (
    <>
      <IonTabs>
        <IonRouterOutlet>
          <Route path="/tabs/scan" component={ScanPage} exact={true} />
          <Route path="/tabs/message-scan" component={MessageScanTab} exact={true} />
          {ROUTES.map((route) => (
            <Route
              exact={!route.hasParam}
              path={`/tabs/${route.tab}`}
              key={route.tab}
              render={(args) => (
                <TabWrapper {...args} component={route.component} />
              )}
            ></Route>
          ))}
          <Route exact path="/tabs">
            <Redirect to={`/tabs/${ROUTES[0]?.tab}`} />
          </Route>
        </IonRouterOutlet>
        <IonTabBar
          slot="bottom"
          style={{
            paddingTop: "10px",
            paddingBottom: "max(env(safe-area-inset-bottom), 10px)",
            boxShadow: `0px 0px 10px 0px ${
              false ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"
            }`,
          }}
        >
          {ROUTES.filter((tabItem) => tabItem.showInTabs).map((tabItem) => (
            <IonTabButton
              disabled={false}
              tab={tabItem.tab}
              href={`/tabs/${tabItem.tab}`}
              key={tabItem.tab}
            >
              {tabItem.icon}
              <IonLabel>{tabItem.title}</IonLabel>
            </IonTabButton>
          ))}
        </IonTabBar>
      </IonTabs>
    </>
  );
};