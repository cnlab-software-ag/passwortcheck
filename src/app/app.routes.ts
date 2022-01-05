import {Routes, RouterModule} from '@angular/router';

import {PasswordcheckComponent} from './passwordcheck/passwordcheck.component';

const APP_ROUTES: Routes = [
    { path: '', redirectTo: 'passwortcheck', pathMatch: 'full' },
    { path: 'passwortcheck', component: PasswordcheckComponent },
];

export const routing = RouterModule.forRoot(APP_ROUTES, { relativeLinkResolution: 'legacy' });
