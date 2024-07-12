import { AppBrand } from "../branding.interfaces";

export const getLogo = (brand: AppBrand, dark?: boolean) =>
  import(`../../../assets/images/logo/${brand}${dark ? "-dark" : ""}.svg`).then(
    (module) => module.default
  );
