import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { QrCodeModule } from './qr-code/qr-code.module';
import { QrGeneratorComponent } from './qr-generator/qr-generator.component';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(QrCodeModule)
  ]
};