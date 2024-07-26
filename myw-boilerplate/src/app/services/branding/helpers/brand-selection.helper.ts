import { BRAND_DICTIONARY } from '../catalogs/brand.dictionary';
import { YNOV } from '../catalogs/ynov';
import { AssetCatalog } from '../interfaces/assets-catalog.interface';
import { BrandSelectionInput } from '../interfaces/brand-selection.input';

export const brandSelectionHelper = ({
  production,
  brand,
  host,
}: BrandSelectionInput): AssetCatalog => {
  if (production && host) {
    for (const substring of host?.split('.')) {
      if (BRAND_DICTIONARY[substring as keyof typeof BRAND_DICTIONARY]) {
        return BRAND_DICTIONARY[substring as keyof typeof BRAND_DICTIONARY];
      }
    }
  } else if (
    brand &&
    BRAND_DICTIONARY[brand as keyof typeof BRAND_DICTIONARY]
  ) {
    return BRAND_DICTIONARY[brand as keyof typeof BRAND_DICTIONARY];
  }

  return YNOV;
};
