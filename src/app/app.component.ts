import { Component } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {WordbookService} from './passwordcheck/wordbook.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  languages = ['de'];

  constructor(
    private translate: TranslateService,
    private wordbook: WordbookService,
  ) {
    translate.addLangs(this.languages);
    const browserLang = translate.getBrowserLang();

    if (browserLang !== undefined && translate.getLangs().includes(browserLang.split('-')[0])) {
      translate.setDefaultLang(browserLang.split('-')[0]);
    } else {
      translate.setDefaultLang('de');
    }
    wordbook.setDefaultWordbook(translate.getDefaultLang());
  }

}
