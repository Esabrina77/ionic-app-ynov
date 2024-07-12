import { AppBrand } from "../branding.interfaces";
import { brandedKeys } from "../constants/branded-keys.constants";

export const getBrandedDictionary = (brand: AppBrand) => {
  return brandedKeys[brand];
};
