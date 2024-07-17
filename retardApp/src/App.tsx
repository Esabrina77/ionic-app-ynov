import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/display.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/padding.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";

import "./App.css";

//import de la famille de polices montserrat
import './theme/fonts.css';
//import des variables css
import "./theme/variables.css";
import { IonReactRouter } from "@ionic/react-router";
import { Route, Redirect } from "react-router";
import { TabRouter } from "./pages/logged/common/TabRouter";
import { defineCustomElements } from '@ionic/pwa-elements/loader';
setupIonicReact();
const App: React.FC = () => {
  defineCustomElements(window);
  return (
    <IonApp>
      <IonReactRouter>
        <Route path="/tabs" component={TabRouter} />
        <Redirect exact from="/" to="/tabs" />
        <Route path="*" render={() => <Redirect to="/tabs" />} />
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
