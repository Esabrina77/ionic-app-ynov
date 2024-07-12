import { AppBrand } from "../branding.interfaces";

export const getAsset = (
  brand: AppBrand,
  path: string,
  dark: boolean,
  extension: string
) => {
  return import(
    `../../../assets/images/auth/auth-background-ynov${
      dark ? "-dark" : ""
    }.png`
  ).then((module) => module.default);
};
