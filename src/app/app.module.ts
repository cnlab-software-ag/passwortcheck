import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import {routing} from "./app.routes";

import { WordbookService } from "./passwordcheck/wordbook.service";
import {PasswordcheckService} from "./passwordcheck/passwordcheck.service";

import { AppComponent } from './app.component';
import { PointtableComponent } from './pointtable/pointtable.component';
import { YeartableComponent } from "./yeartable/yeartable.component";
import { PasswordcheckComponent } from './passwordcheck/passwordcheck.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { PasswordHintsComponent } from './password-hints/password-hints.component';
import { SystemProcessesComponent } from './system-processes/system-processes.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { BuildingStrongPasswordsComponent } from './password-hints/building-strong-passwords/building-strong-passwords.component';
import { SecureStoringPasswordsComponent } from './password-hints/secure-storing-passwords/secure-storing-passwords.component';
import { HowToGetPasswordsComponent } from './password-hints/how-to-get-passwords/how-to-get-passwords.component';
import { SafetyInstructionsOnPcComponent } from './password-hints/safety-instructions-on-pc/safety-instructions-on-pc.component';
import { SystemSetupComponent } from './system-processes/system-setup/system-setup.component';
import { CheckSequenceComponent } from './system-processes/check-sequence/check-sequence.component';
import { HowCrackingProgramWorksComponent } from './system-processes/how-cracking-program-works/how-cracking-program-works.component';
import { WhatDoesThisApplicationComponent } from './system-processes/what-does-this-application/what-does-this-application.component';
import { NewMethodesComponent } from './system-processes/new-methodes/new-methodes.component';
import { SystemProcessingHeaderComponent } from './system-processes/system-processing-header/system-processing-header.component';
import { PasswordHintsHeaderComponent } from './password-hints/password-hints-header/password-hints-header.component';
import { NavigationComponent } from './navigation/navigation.component';

import { TimeAsTextDirective } from './yeartable/time-as-text.directive';
import { TooltipDirective } from './directives/tooltip.directive';
import { LogoBlockDirective } from './header/logo-block.directive';
import { LogoTextDirective } from './header/logo-text.directive';
import { TimeAsTextPipe } from './yeartable/time-as-text.pipe';
import { BigNumberFormatPipe } from './yeartable/big-number-format.pipe';
import { ImpressumComponent } from './impressum/impressum.component';

@NgModule({
  declarations: [
    AppComponent,
    PointtableComponent,
    YeartableComponent,
    PasswordcheckComponent,
    TimeAsTextDirective,
    HeaderComponent,
    SidebarComponent,
    PasswordHintsComponent,
    SystemProcessesComponent,
    StatisticsComponent,
    BuildingStrongPasswordsComponent,
    SecureStoringPasswordsComponent,
    HowToGetPasswordsComponent,
    SafetyInstructionsOnPcComponent,
    SystemSetupComponent,
    CheckSequenceComponent,
    HowCrackingProgramWorksComponent,
    WhatDoesThisApplicationComponent,
    NewMethodesComponent,
    SystemProcessingHeaderComponent,
    PasswordHintsHeaderComponent,
    NavigationComponent,
    TooltipDirective,
    LogoBlockDirective,
    LogoTextDirective,
    TimeAsTextPipe,
    BigNumberFormatPipe,
    ImpressumComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [WordbookService, PasswordcheckService],
  bootstrap: [AppComponent]
})
export class AppModule { }
