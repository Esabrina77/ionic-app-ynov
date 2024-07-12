import { useAtom } from "jotai";
import { appNameAtom, authLogoAtom, logoAtom } from "./branding.service";
import { brandingConfig } from "./config/branding.config";
import { AppBrand } from "./branding.interfaces";
import { useEffect, useMemo } from "react";
import { getAsset } from "./helpers/get-asset";
import { getBrandedDictionary } from "./helpers/get-branded-dictionary";
import { getBrandedKey } from "./helpers/get-branded-key";

export const useBranding = () => {
  const [logo] = useAtom(logoAtom);
  const [appName] = useAtom(appNameAtom);
  const [authLogo, setAuthLogo] = useAtom(authLogoAtom);
  const dictionary = getBrandedDictionary(AppBrand.Ynov);
  const brandedKeys = useMemo(
    () => ({
      auth: {
        background: getBrandedKey(dictionary.auth.background, false),
      },
    }),
    [dictionary]
  );

  useEffect(() => {
    getAsset(
      brandingConfig.brand,
      "images/auth/auth-background",
      false,
      "png"
    ).then((logo) => {
      setAuthLogo(logo);
    });
  }, [brandingConfig.brand]);

  return {
    logo,
    appName,
    brand: brandingConfig.brand as AppBrand,
    assets: { authLogo, brandedKeys },
  };
};
