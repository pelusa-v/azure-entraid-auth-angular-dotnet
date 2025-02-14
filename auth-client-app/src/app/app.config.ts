import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

// MSAL:
import { MsalService, MsalGuard, MsalBroadcastService, MSAL_INSTANCE } from '@azure/msal-angular';
import { appMsalInstance } from './auth-config';
import { provideHttpClient } from '@angular/common/http';


export const appConfig: ApplicationConfig = {
  providers: [
    // Add those services
    provideHttpClient(),
    { provide: MSAL_INSTANCE, useValue: appMsalInstance },
    MsalService,
    MsalBroadcastService,
    MsalGuard,
    ///////////////////////
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes)]
};