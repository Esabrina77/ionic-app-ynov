import type { JSX } from "@ionic/core/components";
import { IonButton, RouterDirection, RouterOptions } from "@ionic/react";
import {
  HTMLAttributes,
  MouseEventHandler,
  PropsWithChildren,
  useCallback,
} from "react";

export type TrackedButtonProps = JSX.IonButton & {
  routerLink?: string | undefined;
  routerDirection?: RouterDirection;
  routerOptions?: RouterOptions;
} & {} & Omit<HTMLAttributes<HTMLIonButtonElement>, "style"> &
  PropsWithChildren;

export const TrackedButton: React.FC<TrackedButtonProps> = (props) => {
  const { ...otherProps } = props;

  const handleClick: MouseEventHandler<HTMLIonButtonElement> = useCallback(
    (e) => {
      if (props.onClick) {
        props.onClick(e);
      }
    },
    [props.onClick]
  );

  return (
    <IonButton {...otherProps} onClick={handleClick}>
      {props.children}
    </IonButton>
  );
};
