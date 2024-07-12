export interface MiscRoute {
  component: React.FC;
  title: string;
  icon?: React.ReactElement;
  href: string;
  exact?: boolean;
  showInMenu?: boolean;
}
