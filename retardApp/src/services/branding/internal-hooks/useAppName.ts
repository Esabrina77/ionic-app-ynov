import { useAtom } from "jotai";
import { appNameAtom } from "../branding.service";
import { useEffect } from "react";
import { App } from "@capacitor/app";

export const useAppName = () => {
  const [_, setAppName] = useAtom(appNameAtom);

  useEffect(() => {
    // at bootstrapping, populate the app name
    App.getInfo().then((infos) => setAppName(infos.name));
  }, []);
};
