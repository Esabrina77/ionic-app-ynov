import { Routes } from '@angular/router';
import { RootComponent } from './root.component';

export const routes: Routes = [
  {
    path: '',
    component: RootComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./main-layout/main-layout.routes').then((m) => m.routes),
      },
      /* Autres routes ne faisant pas parti du périmètre de cette boilerplate */
    ],
  },
];
