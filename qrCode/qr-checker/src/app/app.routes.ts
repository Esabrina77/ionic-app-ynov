import { Routes } from '@angular/router';
import { QrGeneratorComponent } from './qr-generator/qr-generator.component';


export const routes: Routes = [
  { path: 'qr-generator', component: QrGeneratorComponent },
  { path: '', redirectTo: '/qr-generator', pathMatch: 'full' }, // Route par défaut
  // Ajoutez d'autres routes si nécessaire
];