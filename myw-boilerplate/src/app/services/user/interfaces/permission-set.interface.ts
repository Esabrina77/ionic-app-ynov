export enum AppModule {
  StudentDashboard = 'StudentDashboardModule',
  ExampleModule = 'ExampleModule',
  AdminDashboard = 'AdminDashboardModule',
}

export enum Workspace {
  Collaborator = 'Collaborator',
  Student = 'Student',
}

export enum AppFeature {
  YapiConfig = 'YapiConfig',
  Ymatch = 'Ymatch',
  AdminUsers = 'AdminUsers',
  AdminPermissions = 'AdminPermissions',
  CommunicationDiffusionOpen = 'CommunicationDiffusionOpen',
  CommunicationPublicationOpen = 'CommunicationPublicationOpen',
  ExampleRoute1 = 'ExampleRoute1',
  ExampleRoute2 = 'ExampleRoute2',
  ExampleRoute3 = 'ExampleRoute3',
  RetardComponent = 'RetardComponent',
  AbsenceComponent = 'AbsenceComponent',
  QrcodeComponent = 'QrcodeComponent',
}

export enum Apps {
  MyYnov = 'MyYnov',
}

export interface ModuleFeature {
  module: AppModule;
  features: AppFeature[];
}

export interface PermissionSet {
  apps: Apps[];
  modules: AppModule[];
  workspaces: Workspace[];
  disabledFeatures: ModuleFeature[];
  updatedAt: Date;
}
