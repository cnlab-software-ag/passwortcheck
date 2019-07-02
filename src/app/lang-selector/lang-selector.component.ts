import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-lang-selector',
  templateUrl: './lang-selector.component.html',
  styleUrls: ['./lang-selector.component.css']
})
export class LangSelectorComponent implements OnInit, OnDestroy {
  @Output() selectedLang = new EventEmitter<string>();

  availableLangs = ['de'];
  currentLang = 'de';

  constructor(
    private translate: TranslateService,
  ) { }

  ngOnInit() {
    this.availableLangs = this.translate.getLangs();
    this.currentLang = this.translate.getDefaultLang();
    this.selectedLang.emit(this.currentLang);
  }

  setLanguage(lang: string) {
    this.translate.setDefaultLang(lang);
    this.currentLang = lang;
    this.selectedLang.emit(this.currentLang);
  }

  ngOnDestroy(): void {
    this.selectedLang.unsubscribe();
  }

}
