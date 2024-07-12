import { AppBrand } from "../branding.interfaces";

export interface BrandedDictionary {
  auth: {
    background: BrandedKey;
  };
}

export interface BrandedKey {
  light: string;
  dark: string;
}

export const brandedKeys: Record<AppBrand, BrandedDictionary> = {
  ynov: {
    auth: {
      background: {
        light: "linear-gradient(0deg, #23b2a4, #D0EAE7)",
        dark: "linear-gradient(0deg, #23b2a4, #2e3837)",
      },
    },
  },
  eicar: {
    auth: {
      background: {
        light: "linear-gradient(0deg, #d2112f, #fafafa)",
        dark: "linear-gradient(0deg, #d2112f, #1d1d1b)",
      },
    },
  },
} as const;
