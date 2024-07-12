import { BrandedKey } from "../constants/branded-keys.constants";

export const getBrandedKey = (key: BrandedKey, dark: boolean) =>
  dark ? key["dark"] : key["light"];
