import { Route } from '@angular/router';

import { HomeComponent } from './home/home.component';

export const ROUTES: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'questionnaire',
    loadComponent: () =>
      import('../app/questionnaire/questionnaire.component').then(
        (mod) => mod.QuestionnaireComponent,
      ),
  },

  {
    path: 'questionnaire-nested',
    loadComponent: () =>
      import('../app/questionnaire-nested/questionnaire-nested.component').then(
        (mod) => mod.QuestionnaireNestedComponent,
      ),
  },
];
