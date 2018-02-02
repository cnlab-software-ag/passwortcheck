import {Injectable, EventEmitter} from '@angular/core';
import {Http} from "@angular/http";
import * as Lazy from 'lazy.js';
import 'rxjs/add/operator/map'
import {Subscription} from "rxjs";
import {Wordbook} from "./wordbook.model";

@Injectable()
export class WordbookService {
  private availableWordbooks: Wordbook[] = [
    new Wordbook("Datum", "Datum", "dates.txt", [], true, false, false),
    new Wordbook("Sequenz", "Sequenz", "sequences.txt", [], true, false, false),
    new Wordbook("Tastatur", "Tastatur", "keyboard.txt", [], true, false, false),
    new Wordbook("Namensliste", "Namensliste", "surnames.txt", [], true, false, true),
	new Wordbook("Passwortliste", "Passwortliste", "passwordlist.txt", [], true, false, false),
    new Wordbook("Deutsch", "Wort (Deutsch)", "swiss.txt", [], true, true, true),
    new Wordbook("Französisch", "Wort (Französisch)", "french.txt", [], false, true, true),
    new Wordbook("Italienisch", "Wort (Italienisch)", "italian.txt", [], false, true, true),
    new Wordbook("Rätoromanisch", "Wort (Rätoromanisch)", "romansh-experimental.txt", [], false, true, true),
    new Wordbook("Englisch", "Wort (Englisch)", "english.txt", [], false, true, true)
  ];
  wordbookIsUpdating = new EventEmitter<boolean>();

  constructor(private http: Http){}

  getAvailableWordbooks() {
    return this.availableWordbooks;
  }

  getActiveWordbooks() {
    return Lazy(this.availableWordbooks).filter((wordbook) => wordbook.active).toArray();
  }

  getDisplayedWordbooks() {
    return Lazy(this.availableWordbooks).filter((wordbook) => wordbook.displayed).toArray();
  }

  getWordbook(name: string):Subscription {
    this.wordbookIsUpdating.emit(true);
    let wordbook = Lazy(this.availableWordbooks).find((wordbook) => wordbook.name === name);

    if (wordbook.words.length <= 0) {
      return this.http.get("assets/wordlists/" + wordbook.file)
        .map(this.extractData)
        .subscribe(
          (loadedWordbook) => {
            wordbook.words = loadedWordbook;
            this.wordbookIsUpdating.emit(false);
          });
    } else {
      this.wordbookIsUpdating.emit(false);
    }
    return null;
  }

  extractData(response):Array<string>{
    let wordbook = response.text().split('\n');
    return Lazy(wordbook).filter((item) => { return item !== ""}).sort().toArray();
  }

}
