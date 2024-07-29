import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./scolarity.component').then(
        (m) => m.ScolarityComponent
      ),
    children: [
      { 
        path: 'retard',
        loadComponent: () =>
          import('./retard/retard.component').then((m) => m.RetardComponent),
      },
      {
        path: 'absence',
        loadComponent: () =>
          import('./absence/absence.component').then((m) => m.AbsenceComponent),
      },
      {
        path: 'qrcode',
        loadComponent: () =>
          import('./qrcodegenerator/qr-generator.component').then((m) => m.QrGeneratorComponent),
      },
    ],
  },
];