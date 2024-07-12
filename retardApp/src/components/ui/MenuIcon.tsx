import { IonIcon } from "@ionic/react";

import "./MenuIcon.scss";

export interface IonIconProps {
  color?: string;
  flipRtl?: boolean;
  icon?: string;
  ios?: string;
  lazy?: boolean;
  md?: string;
  mode?: "ios" | "md";
  name?: string;
  size?: string;
  src?: string;
}

export const MenuIcon: React.FC<IonIconProps> = (args) => (
  <IonIcon {...args} color="tertiary" className="menu-icon" />
);
