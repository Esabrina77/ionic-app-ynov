import { AppBrand } from "../../branding/branding.interfaces";
import { AppFeature } from "../../user/interfaces/app-feature.enum";

export interface TabItemMiscMenuInfos {
  title: string;
  href: string;
  icon: React.ReactElement;
  action?: (...args: any) => void | Promise<void>;
  actionParams?: any[];
  brand?: AppBrand[];
  feature?: AppFeature;
}

export interface RouteItem<T = any> {
  component: React.FC<T>;
  title: string;
  icon?: React.ReactElement;
  tab: string;
  showInTabs?: boolean;
  brand: AppBrand[];
  menu?: TabItemMiscMenuInfos;
  hasParam?: boolean;
  feature?: AppFeature;
}
