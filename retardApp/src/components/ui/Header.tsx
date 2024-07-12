import {
  IonBackButton,
  IonButtons,
  IonHeader,
  IonIcon,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import { motion } from "framer-motion";
import { menu, notificationsOutline } from "ionicons/icons";
import React from "react";
import { useBranding } from "../../services/branding/useBranding";
import { TrackedButton } from "./TrackedButton";

import { useUser } from "../../services/user/useUser";
import "./Header.scss";

export type HeaderProps = {
  title: string;
  showLogo?: boolean;
  hideMenu?: boolean;
  backButtonText?: string;
};

export const Header: React.FC<HeaderProps> = ({
  title,
  backButtonText,
  showLogo,
  hideMenu,
}) => {
  const { logo } = useBranding();
  const { push } = useIonRouter();
  const { tokenData } = useUser();

  return (
    <IonHeader mode="ios">
      <IonToolbar mode="ios">
        <IonButtons slot="start">
          {(showLogo && (
            <div style={{ marginLeft: -8 }}>
              <TrackedButton
                color="dark"
                onClick={() => {
                  if (tokenData) {
                    push("/tabs/home", "none", "push");
                  }
                }}
              >
                <img src={logo} className="header__logo" />
              </TrackedButton>
            </div>
          )) || <IonBackButton text={backButtonText || "Retour"} />}
        </IonButtons>
        <IonButtons slot="end">
          {!hideMenu && (
            <>
              <div
                style={{
                  position: "relative",
                  marginRight: 8,
                }}
              >
                <TrackedButton
                  color="dark"
                  disabled={true}
                  onClick={() => {
                    push("/tabs/notifications", "none", "push");
                  }}
                >
                  <IonIcon icon={notificationsOutline}></IonIcon>
                </TrackedButton>
              </div>
            </>
          )}
          <motion.div whileTap={{ scale: 1.3 }}>
            {!hideMenu && (
              <TrackedButton
                color="dark"
                disabled={true}
                onClick={() => {
                  push("/tabs/menu", "none", "push");
                }}
              >
                <IonIcon icon={menu} />
              </TrackedButton>
            )}
          </motion.div>
        </IonButtons>
        <IonTitle>{title}</IonTitle>
      </IonToolbar>
    </IonHeader>
  );
};
