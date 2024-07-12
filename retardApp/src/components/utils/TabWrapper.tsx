import { IonPage } from "@ionic/react";
import React, { createContext, useContext } from "react";
import { RouteComponentProps } from "react-router";

const TabWrapping = createContext(false);
export const useIsTab = () => useContext(TabWrapping);

export type TabWrappedComponent = { isTab?: boolean } & RouteComponentProps;

export const TabWrapper: React.FC<
  { component: React.FC } & RouteComponentProps
> = (props) => {
  const { component, ...otherProps } = props;

  const renderedComponent = component({ ...otherProps, isTab: true });

  return (
    <TabWrapping.Provider value={true}>
      <IonPage>{renderedComponent}</IonPage>
    </TabWrapping.Provider>
  );
};
