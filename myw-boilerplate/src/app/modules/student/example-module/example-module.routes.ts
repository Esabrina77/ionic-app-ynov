import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./example-module.component').then(
        (m) => m.ExampleModuleComponent
      ),
    children: [
      {
        path: 'route1',
        loadComponent: () =>
          import('./route1/route1.component').then((m) => m.Route1Component),
      },
      {
        path: 'route2',
        loadComponent: () =>
          import('./route2/route2.component').then((m) => m.Route2Component),
      },
      {
        path: 'route3',
        loadComponent: () =>
          import('./route3/route3.component').then((m) => m.Route3Component),
      },
    ],
  },
];
