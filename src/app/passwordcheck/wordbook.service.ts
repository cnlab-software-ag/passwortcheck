import {Injectable, EventEmitter} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import * as Lazy from 'lazy.js';
import {Wordbook} from './wordbook.model';
import {map} from 'rxjs/operators';
import {Subscription} from 'rxjs/internal/Subscription';

@Injectable()
export class WordbookService {
  private availableWordbooks: Wordbook[] = [
    new Wordbook('', 'datum', 'datum', 'dates.txt', [], true, false, false),
    new Wordbook('', 'sequence', 'sequence', 'sequences.txt', [], true, false, false),
    new Wordbook('', 'keyboard', 'keyboard', 'keyboard.txt', [], true, false, false),
    new Wordbook('', 'nameList', 'nameList', 'surnames.txt', [], true, false, true),
    new Wordbook('', 'passwordList', 'passwordList', 'passwordlist.txt', [], true, false, false),
    new Wordbook('de', 'german', 'german', 'swiss.txt', [], true, true, true),
    new Wordbook('fr', 'french', 'french', 'french.txt', [], false, true, true),
    new Wordbook('it', 'italian', 'italian', 'italian.txt', [], false, true, true),
    new Wordbook('rm', 'rhaetoRomansch', 'rhaetoRomansch', 'romansh-experimental.txt', [], false, true, true),
    new Wordbook('en', 'english', 'english', 'english.txt', [], false, true, true)
  ];
  wordbookIsUpdating = new EventEmitter<boolean>();

  constructor(private http: HttpClient) {}

  setDefaultWordbook(lang: string) {
    Lazy(this.availableWordbooks).filter((wordbook) => wordbook.lang !== '').each(wordbook => wordbook.active = false);
    Lazy(this.availableWordbooks).filter((wordbook) => wordbook.lang === lang).each(wordbook => wordbook.active = true);
  }

  getAvailableWordbooks() {
    return this.availableWordbooks;
  }

  getActiveWordbooks() {
    return Lazy(this.availableWordbooks).filter((wordbook) => wordbook.active).toArray();
  }

  getDisplayedWordbooks() {
    return Lazy(this.availableWordbooks).filter((wordbook) => wordbook.displayed).toArray();
  }

  getWordbook(name: string): Subscription {
    this.wordbookIsUpdating.emit(true);
    const wordbook = Lazy(this.availableWordbooks).find(current => current.name === name);

    if (wordbook.words.length <= 0) {
      return this.http.get('assets/wordlists/' + wordbook.file, {responseType: 'text'}).pipe(
        map(response => this.extractData(response))
      ).subscribe(
          loadedWordbook => {
            wordbook.words = loadedWordbook;
            this.wordbookIsUpdating.emit(false);
          });
    } else {
      this.wordbookIsUpdating.emit(false);
    }
    return null;
  }

  extractData(response): Array<string> {
    const wordbook: string[] = response.split(/\r?\n/);
    return Lazy(wordbook).filter((item) => { return item !== ''}).sort().toArray();
  }

}
