import {Routes, RouterModule} from "@angular/router";

import {NavigationComponent} from "./navigation/navigation.component";
import {PasswordcheckComponent} from "./passwordcheck/passwordcheck.component";
import {PasswordHintsComponent} from "./password-hints/password-hints.component";
import {SystemProcessesComponent} from "./system-processes/system-processes.component";
import {StatisticsComponent} from "./statistics/statistics.component";

import {SYSTEM_PROCESSES_ROUTES} from "./system-processes/system-processes.routes";
import {PASSWORD_HINTS_ROUTES} from "./password-hints/password-hints.routes";
import {ImpressumComponent} from "./impressum/impressum.component";

const APP_ROUTES: Routes = [
  { path: '', component: NavigationComponent, children: [
    { path: '', redirectTo: 'passwortcheck', pathMatch: 'full' },
    { path: 'passwortcheck', component: PasswordcheckComponent },
    { path: 'passworttipps', component: PasswordHintsComponent, children: PASSWORD_HINTS_ROUTES },
    { path: 'systemablauf', component: SystemProcessesComponent, children: SYSTEM_PROCESSES_ROUTES },
    { path: 'statistik', component: StatisticsComponent },
    { path: 'impressum', component: ImpressumComponent }
    ]},
  { path: 'noheader', component: PasswordcheckComponent }
];

export const routing = RouterModule.forRoot(APP_ROUTES);
