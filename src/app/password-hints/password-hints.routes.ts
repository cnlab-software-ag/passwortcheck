import {Routes} from "@angular/router";

import {BuildingStrongPasswordsComponent} from "./building-strong-passwords/building-strong-passwords.component";
import {SecureStoringPasswordsComponent} from "./secure-storing-passwords/secure-storing-passwords.component";
import {HowToGetPasswordsComponent} from "./how-to-get-passwords/how-to-get-passwords.component";
import {SafetyInstructionsOnPcComponent} from "./safety-instructions-on-pc/safety-instructions-on-pc.component";

export const PASSWORD_HINTS_ROUTES: Routes = [
  { path: '', redirectTo: 'passworttipps', pathMatch: 'full'},
  { path: 'passworttipps', component: BuildingStrongPasswordsComponent },
  { path: 'passwoerterspeichern', component: SecureStoringPasswordsComponent },
  { path: 'passwortmissbrauch', component: HowToGetPasswordsComponent },
  { path: 'schutzmassnahmenaufdempc', component: SafetyInstructionsOnPcComponent }
];



