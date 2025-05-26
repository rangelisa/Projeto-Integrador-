import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config'; // se existir

bootstrapApplication(AppComponent, appConfig)
  .catch((err: any) => console.error(err));