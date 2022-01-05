import {Component, OnInit, OnDestroy, AfterViewInit} from '@angular/core';

import * as Lazy from 'lazy.js';

import {WordbookService} from './wordbook.service';

import {Metrics} from './metrics.model';
import {Wordbook} from './wordbook.model';
import {Subscription} from 'rxjs';
import {PasswordcheckService} from './passwordcheck.service';
import {TranslateService} from '@ngx-translate/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-passwordcheck',
  templateUrl: './passwordcheck.component.html',
  styles: [`
    input[type=text]::-ms-clear{ display: none; width: 0; height: 0}
    input[type=text]::-ms-reveal{ display: none; width: 0; height: 0}
    input[type=password]::-ms-clear{ display: none; width: 0; height: 0}
    input[type=password]::-ms-reveal{ display: none; width: 0; height: 0}
    
    .wordbook {
        word-wrap: break-word;
    }
    .wordbook-warning {
      margin-left: 5px;
      font-weight: bold;
    }
  `]
})

export class PasswordcheckComponent implements OnInit, AfterViewInit, OnDestroy {
  metrics: Metrics = new Metrics();
  userText: {userText: string, strong: boolean} = {userText: '', strong: false};
  availableWordbooks: Wordbook[] = [];
  displayedWordbooks: Wordbook[] = [];
  onWordbookChanges: Subscription = null;
  busy: Subscription[] = [];
  isLoading = false;
  selectedLang = '';
  isNoHeader = false;

  constructor(
    private wordbookService: WordbookService,
    private passwordcheckerService: PasswordcheckService,
    private translate: TranslateService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.availableWordbooks = this.wordbookService.getAvailableWordbooks();
    this.displayedWordbooks = this.wordbookService.getDisplayedWordbooks();
    this.isNoHeader = this.route.snapshot.url[0].path.includes('noheader');
    this.route.queryParams.subscribe(param => {
      this.selectedLang = param['lang'].toString();
      this.translate.use(this.selectedLang);
    })
  }

  ngAfterViewInit() {
    Lazy(this.availableWordbooks).filter(
        wordbook => wordbook.active
    ).each(
        wordbook => this.busy.push(this.wordbookService.getWordbook(wordbook.name))
    );
    this.onWordbookChanges = this.wordbookService.wordbookIsUpdating.subscribe(
        (inProgress: boolean) => {
          if (!inProgress) { this.checkPassword(this.metrics.password) }
          this.isLoading = inProgress;
        }
    );
  }

  ngOnDestroy() {
    Lazy(this.busy)
      .filter((subscription) => subscription !== null)
      .each((subscription) => subscription.unsubscribe());
    this.onWordbookChanges.unsubscribe();
    this.passwordcheckerService.sendStateToServerIfNotSent();
  }

  loadWordbook(wordbook: Wordbook) {
    wordbook.active = !wordbook.active;
    Lazy(this.busy)
      .filter((subscription) => subscription !== null)
      .each((subscription) => subscription.unsubscribe());
    this.busy = [];
    this.busy.push(this.wordbookService.getWordbook(wordbook.name));
  }

  showWordbookSelectionWarning(wordbook: Wordbook) {
    return wordbook.lang === this.translate.getDefaultLang() && !wordbook.active;
  }

  checkPassword(password) {
    const wordbooks = this.wordbookService.getActiveWordbooks();

    const wordIndexes = this.passwordcheckerService.getWordbookEntries(wordbooks, password);
    const remainingPasswordChars = this.passwordcheckerService.remainingChars(wordIndexes, password);

    const hasChanged = this.metrics.password !== password;
    this.metrics.password = password;
    this.metrics.wordIndexes = wordIndexes;
    this.metrics.remainingPasswordChars = remainingPasswordChars;

    if (password !== '') {
      this.userText = this.passwordcheckerService.getUserText(this.metrics);
    } else {
      this.userText = {userText: '', strong: false};
    }
    if (password !== '' || hasChanged) {
      this.passwordcheckerService.sendStateToServerAfterTimeout(this.userText.strong);
    }
  }

}
