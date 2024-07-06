import { HttpClientModule } from '@angular/common/http';
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter, RouterModule, withInMemoryScrolling } from '@angular/router';

import { AppComponent } from './app/app.component';
import { ROUTES } from './app/app.route';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    provideAnimationsAsync(),
    provideRouter(
      ROUTES,
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled',
        anchorScrolling: 'enabled',
      }),
    ),
    importProvidersFrom(RouterModule.forRoot([...ROUTES])),
    importProvidersFrom(HttpClientModule), provideAnimationsAsync(),
  ],
}).catch((err) => console.error(err));
