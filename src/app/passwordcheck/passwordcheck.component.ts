import {Component, OnInit, OnDestroy, AfterViewInit} from '@angular/core';

import * as Lazy from 'lazy.js';

import {WordbookService} from "./wordbook.service";

import {Metrics} from './metrics.model';
import {Wordbook} from "./wordbook.model";
import {Subscription} from "rxjs";
import {PasswordcheckService} from "./passwordcheck.service";

@Component({
  selector: 'app-passwordcheck',
  templateUrl: './passwordcheck.component.html',
  styles: [`
    input[type=text]::-ms-clear{ display: none; width: 0; height: 0}
    input[type=text]::-ms-reveal{ display: none; width: 0; height: 0}
    input[type=password]::-ms-clear{ display: none; width: 0; height: 0}
    input[type=password]::-ms-reveal{ display: none; width: 0; height: 0}
    
    .overlay {
        background: #ffffff;
        color: #666666;
        opacity: 0.5;
        position: fixed;
        height: 100%;
        width: 100%;
        z-index: 5000;
        top: 0;
        left: 0;
        float: left;
        text-align: center;
        padding-top: 25%;
    }
    .wordbook {
        word-wrap: break-word;
    }
  `]
})
export class PasswordcheckComponent implements OnInit, AfterViewInit, OnDestroy {
  metrics: Metrics = new Metrics();
  userText: {usertext: string, strong: boolean} = {usertext: "", strong: false};
  availableWordbooks: Wordbook[] = [];
  displayedWordbooks: Wordbook[] = [];
  onWordbookChanges: Subscription = null;
  busy: Subscription[] = [];
  isLoading: boolean = false;

  constructor(
    private wordbookService: WordbookService,
    private passwordcheckerService: PasswordcheckService
  ) {}

  ngOnInit() {
    this.availableWordbooks = this.wordbookService.getAvailableWordbooks();
    this.displayedWordbooks = this.wordbookService.getDisplayedWordbooks();
  }

  ngAfterViewInit() {
    Lazy(this.availableWordbooks).filter(
        wordbook => wordbook.active
    ).each(
        wordbook => this.busy.push(this.wordbookService.getWordbook(wordbook.name))
    );
    this.onWordbookChanges = this.wordbookService.wordbookIsUpdating.subscribe(
        (inProgress: boolean) => {
          if(!inProgress) { this.checkPassword(this.metrics.password) };
          this.isLoading = inProgress;
        }
    );
  }

  ngOnDestroy() {
    Lazy(this.busy)
      .filter((subscription) => subscription != null)
      .each((subscription) => subscription.unsubscribe());
    this.onWordbookChanges.unsubscribe();
    this.passwordcheckerService.sendStateToServerIfNotSent();
  }

  loadWordbook(wordbook: Wordbook) {
    wordbook.active = !wordbook.active;
    Lazy(this.busy)
      .filter((subscription) => subscription != null)
      .each((subscription) => subscription.unsubscribe());
    this.busy = [];
    this.busy.push(this.wordbookService.getWordbook(wordbook.name));
  }

  checkPassword(password) {
    let wordbooks = this.wordbookService.getActiveWordbooks();

    let wordIndexes = this.passwordcheckerService.getWordbookEntries(wordbooks, password);
    let remainingPasswordChars = this.passwordcheckerService.remainingChars(wordIndexes, password);

    let hasChanged = this.metrics.password !== password;
    this.metrics.password = password;
    this.metrics.wordIndexes = wordIndexes;
    this.metrics.remainingPasswordChars = remainingPasswordChars;

    if(password !== "") {
      this.userText = this.passwordcheckerService.getUserText(this.metrics);
    } else {
      this.userText = {usertext: "", strong: false};
    }
    if(password !== "" || hasChanged) {
      this.passwordcheckerService.sendStateToServerAfterTimeout(this.userText.strong);
    }
  }

}
