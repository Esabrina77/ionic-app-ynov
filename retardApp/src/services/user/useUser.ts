import { useAtom } from "jotai";
import { useCallback, useEffect, useMemo } from "react";
import { AppFeature } from "./interfaces/app-feature.enum";
import { yapiTokenAtom } from "./user.service";

export const useUser = () => {
  const [yapiToken, setYapiToken] = useAtom(yapiTokenAtom);

  const logout = useCallback(() => {}, [setYapiToken]);

  const isFeatureDisabled = useCallback(
    (feature: AppFeature) => {
      return yapiToken?.disabledFeatures?.includes(feature);
    },
    [yapiToken?.disabledFeatures]
  );

  return {
    isTestUser: false,
    disabledFeatures: yapiToken?.disabledFeatures || [],
    tokenData: yapiToken?.data,
    utils: {
      logout,
      isFeatureDisabled,
    },
  };
};
