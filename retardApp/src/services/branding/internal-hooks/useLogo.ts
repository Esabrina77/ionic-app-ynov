import { useAtom } from "jotai";
import { useEffect } from "react";
import { logoAtom } from "../branding.service";
import { getLogo } from "../helpers/get-logo";
import { brandingConfig } from "../config/branding.config";

export const useLogo = () => {
  const [_, setLogo] = useAtom(logoAtom);

  useEffect(() => {
    // during bootstrapping, feed correct logo to atom
    getLogo(brandingConfig.brand, false).then((value) => {
      setLogo(value);
    });
  }, []);
};
