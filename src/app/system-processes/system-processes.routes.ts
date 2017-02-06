import {Routes} from "@angular/router";

import {SystemSetupComponent} from "./system-setup/system-setup.component";
import {CheckSequenceComponent} from "./check-sequence/check-sequence.component";
import {HowCrackingProgramWorksComponent} from "./how-cracking-program-works/how-cracking-program-works.component";
import {WhatDoesThisApplicationComponent} from "./what-does-this-application/what-does-this-application.component";
import {NewMethodesComponent} from "./new-methodes/new-methodes.component";

export const SYSTEM_PROCESSES_ROUTES: Routes = [
  { path: '', redirectTo: 'systemaufbau', pathMatch: 'full' },
  { path: 'systemaufbau', component: SystemSetupComponent },
  { path: 'pruefablauf', component: CheckSequenceComponent },
  { path: 'passwoerterknacken', component: HowCrackingProgramWorksComponent },
  { path: 'wasmachtdiesesprogramm', component: WhatDoesThisApplicationComponent },
  { path: 'neuemethoden', component: NewMethodesComponent }
];

