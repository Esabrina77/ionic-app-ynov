import { Routes } from '@angular/router';
import { MainLayoutComponent } from './main-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'dashboard-student',
        loadComponent: () =>
          import(
            '../../modules/student/student-dashboard/student-dashboard.component'
          ).then((m) => m.StudentDashboardComponent),
      },
      {
        path: 'student/example-module',
        loadChildren: () =>
          import(
            '../../modules/student/example-module/example-module.routes'
          ).then((m) => m.routes),
      },
      {
        path: 'dashboard-admin',
        loadComponent: () =>
          import(
            '../../modules/admin/admin-dashboard/admin-dashboard.component'
          ).then((m) => m.AdminDashboardComponent),
      },
      {
        path: 'admin/scolarity',
        loadChildren: () =>
          import(
            '../../modules/admin/scolarity/scolarity.routes'
          ).then((m) => m.routes),
      },
      {
        path: 'workspace-selector',
        loadComponent: () =>
          import('./workspace-selector/workspace-selector.component').then(
            (m) => m.WorkspaceSelectorComponent
          ),
      },
      {
        path: '',
        pathMatch: 'full',
        loadComponent: () =>
          import('../default-route/default-route.component').then(
            (m) => m.DefaultRouteComponent
          ),
      },
    ],
  },
];
