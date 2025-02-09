import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { appMsalInstance } from './app/auth-config';

// bootstrapApplication(AppComponent, appConfig)
//   .catch((err) => console.error(err));




appMsalInstance
  .initialize()
  .then(() => {
    console.log('MSAL initialized');
    // Bootstrap the Angular app after MSAL is initialized
    bootstrapApplication(AppComponent, appConfig).catch((err) =>
      console.error(err)
    );
  })
  .catch((error) => {
    console.error('MSAL initialization failed', error);
  });