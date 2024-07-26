import {
  AppFeature,
  AppModule,
  Workspace,
} from '../user/interfaces/permission-set.interface';

export type LayoutChild = {
  feature: AppFeature;
  title: string;
  route: string;
  icon?: string;
};

export type LayoutModule = {
  module: AppModule;
  workspaces?: Workspace[]; // If the module is workspace specific, it's permission + workspace driven, if not, it will be permission driven only
  title: string;
  route: string;
  children: LayoutChild[];
  icon?: string;
  position: 'top' | 'bottom';
};

export const LAYOUT: LayoutModule[] = [
  {
    module: AppModule.StudentDashboard,
    workspaces: [Workspace.Student],
    title: 'Dashboard',
    route: 'dashboard-student',
    children: [],
    position: 'top',
    icon: 'dashboard',
  },
  {
    module: AppModule.AdminDashboard,
    workspaces: [Workspace.Collaborator],
    title: 'Scolarity',
    route: 'admin/scolarity',
    children: [
      {
        feature: AppFeature.RetardComponent,
        route: 'retard',
        title: 'Retard',
        icon: 'clock',
      },
      {
        feature: AppFeature.AbsenceComponent,
        route: 'absence',
        title: 'Absence',
        icon: 'question_mark',
      },
      {
        feature: AppFeature.QrcodeComponent,
        route: 'qrcode',
        title: 'Qrcode',
        icon: 'qrcode',
      },
    ],
    position: 'top',
    icon: 'book',
  },
  {
    module: AppModule.ExampleModule,
    workspaces: [Workspace.Student],
    title: 'Example Module',
    route: 'student/example-module',
    children: [
      {
        feature: AppFeature.ExampleRoute1,
        route: 'route1',
        title: 'Feature 1',
        icon: 'question_mark',
      },
      {
        feature: AppFeature.ExampleRoute2,
        route: 'route2',
        title: 'Feature 2',
        icon: 'question_mark',
      },
      {
        feature: AppFeature.ExampleRoute3,
        route: 'route3',
        title: 'Feature 3',
        icon: 'question_mark',
      },
    ],
    position: 'top',
    icon: 'question_mark',
  },
];
