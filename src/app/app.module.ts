import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';

import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import {routing} from './app.routes';
import { WordbookService } from './passwordcheck/wordbook.service';
import {PasswordcheckService} from './passwordcheck/passwordcheck.service';
import { AppComponent } from './app.component';
import { YeartableComponent } from './yeartable/yeartable.component';
import { PasswordcheckComponent } from './passwordcheck/passwordcheck.component';
import { LangSelectorComponent } from './lang-selector/lang-selector.component';
import { TimeAsTextDirective } from './yeartable/time-as-text.directive';
import { TimeAsTextPipe } from './yeartable/time-as-text.pipe';
import { BigNumberFormatPipe } from './yeartable/big-number-format.pipe';

@NgModule({
  declarations: [
    AppComponent,
    YeartableComponent,
    PasswordcheckComponent,
    TimeAsTextDirective,
    TimeAsTextPipe,
    BigNumberFormatPipe,
    LangSelectorComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    routing
  ],
  providers: [WordbookService, PasswordcheckService],
  bootstrap: [AppComponent]
})
export class AppModule { }

// required for AOT compilation
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/');
}
