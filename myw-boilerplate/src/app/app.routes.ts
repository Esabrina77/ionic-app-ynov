import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    canActivate: [
      /*AuthGuard*/
    ],
    loadChildren: () => import('./root/root.routes').then((m) => m.routes),
  },
  {
    path: '404',
    loadComponent: () =>
      import('./root/main404/main404.component').then(
        (m) => m.Main404Component
      ),
  },
  {
    path: '**',
    redirectTo: '404',
  },
];
