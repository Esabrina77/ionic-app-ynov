import { atom } from "jotai";
import React from "react";
import { useAppName } from "./internal-hooks/useAppName";
import { useLogo } from "./internal-hooks/useLogo";

// ATOMS
export const logoAtom = atom("");
export const appNameAtom = atom("");
export const authLogoAtom = atom("");

export const BrandingService: React.FC = () => {
  useLogo();
  useAppName();
  return <></>;
};
