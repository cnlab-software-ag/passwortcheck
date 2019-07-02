import {Injectable} from '@angular/core';
import * as Lazy from 'lazy.js';

import {Pattern} from './patterns';

import {Word} from './word.model';
import {Character} from './characters.model';
import {RemainingChars} from './remainingChars.model';
import {Wordbook} from './wordbook.model';
import {PasswordPartial} from './passwordPartial.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class PasswordcheckService {
  timer = null;

  constructor(private http: HttpClient) {}

  normalizedPassword(password: string) {
    const pwChars = Lazy(password).split('');
    const result = [];
    Lazy(pwChars).each(
      function (pwChar: string) {
        if (Lazy(Object.keys(Pattern.numbersAsLetter)).contains(pwChar)) {
          result.push(Pattern.numbersAsLetter[pwChar]);
        } else {
          result.push(pwChar);
        }
      }
    );
    return Lazy(result.join('')).toLowerCase().toString();
  }

  getWordbookEntries(wordbooks: Wordbook[], userInput: string) {
    const matrix: PasswordPartial[][] = this.computeMatrix(wordbooks, userInput);
    return this.findeShortestPath(matrix);
  }

  computeMatrix(wordbooks: Wordbook[], userInput: string) {
    const matrix: PasswordPartial[][] = [];
    for (let i = 0; i < userInput.length; i++) {
      matrix[i] = [];
    }

    Lazy(wordbooks).each( (wordbook) => {
      const charRoomSize = this.remainingCharRoomSize(userInput);
      let password = userInput;
      let normalizedRoomSizeMultiplier = 1;
      if (wordbook.normalized) {
        password = this.normalizedPassword(userInput);
        normalizedRoomSizeMultiplier = 10;
      }

      for (let i = 0; i < password.length; i++) {
        for (let j = i; j < password.length; j++) {
          const partialPassword = Lazy(password).substring(i, j + 1).toString();
          const index = Lazy(wordbook.words).sortedIndex(partialPassword).toString();
          if (wordbook.words[index] === partialPassword) {
            const partialUserInput = Lazy(userInput).substring(i, j + 1).toString();
            const effectiveRoomSizeMultiplier = partialUserInput.toLowerCase() === wordbook.words[index] ? 1 : normalizedRoomSizeMultiplier;
            matrix[i][j] = new Word(
              partialUserInput,
              wordbook.words[index], i, i + partialPassword.length - 1, partialPassword.length,
              wordbook.words.length * effectiveRoomSizeMultiplier, wordbook.source
            );
          } else if (partialPassword.length === 1) {
            matrix[i][j] = new Character(partialPassword, i, i, partialPassword.length, charRoomSize);
          }
        }
      }
    });

    return matrix
  }

  findeShortestPath(matrix: PasswordPartial[][]) {
    const indexes: PasswordPartial[] = [];
    const nodes: PasswordPartial[] = [];
    const path: number[] = [];
    for (let u = 0; u < matrix.length; u++) {
      for (let v = 0; v <= u; v++) {
        if (matrix[v][u] != null) {
          const edge = matrix[v][u];
          const lastEdgeEntropie = path[u - edge.length] != null ? path[u - edge.length] : 0;
          if (nodes.length <= u) {
            nodes.push(edge);
            if (path.length > 0) {
              path.push(edge.entropie() + lastEdgeEntropie);
            } else {
              path.push(edge.entropie());
            }
          } else if (path[u] > (edge.entropie() + lastEdgeEntropie)) {
            nodes[u] = edge;
            path[u] = (edge.entropie() + lastEdgeEntropie);
          }
        }
      }
    }

    for (let i = path.length - 1; i >= 0;) {
      const word = nodes[i];
      indexes.push(word);
      i -= word.length;
    }
    return Lazy(indexes).filter((item) => {
      return item.type !== 'Zeichen';
    }).reverse().toArray();
  }

  remainingChars(words: PasswordPartial[], password: string) {
    let remainingChars = '';
    let nextStartIndex = 0;

    Lazy(words).each(function (word) {
      remainingChars = remainingChars + Lazy(password).substring(nextStartIndex, word.passwordStartIndex).toString();
      nextStartIndex = word.passwordStopIndex + 1;
    });
    remainingChars = remainingChars + Lazy(password).substring(nextStartIndex).toString();

    return new RemainingChars(remainingChars, 0, 0, remainingChars.length, this.remainingCharRoomSize(remainingChars));
  }

  remainingCharRoomSize(passwordPart) {
    let roomsize = 0;
    if (Pattern.digits.test(passwordPart)) { roomsize += 10; }
    if (Pattern.lowerChars.test(passwordPart)) { roomsize += 26; }
    if (Pattern.upperChars.test(passwordPart)) { roomsize += 26; }
    if (Pattern.specialChars.test(passwordPart)) { roomsize += 40; }
    return roomsize;
  }

  getUserText(metrics) {
    const years = metrics.timeToBreak();
    const timeLimit = metrics.timeLimit;
    let userText = 'belowOneYear';
    let strong = false;
    if (years >= timeLimit) {
      userText = 'overOneYear';
      strong = true;
    }
    return {userText: userText, strong: strong};
  }

  sendStateToServerAfterTimeout(state: boolean) {
    window.clearTimeout(this.timer);
    this.timer = window.setTimeout(() => this.sendStateToServer(state), 3000);
  }

  sendStateToServer(state: boolean) {
    window.clearTimeout(this.timer);
    const body: string = 'result=' + (state ? '1' : '0');
    const headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
    this.http.post('resultimport.php', body, { headers: headers }).subscribe(
      () => {},
      () => {}
    );
  }

  sendStateToServerIfNotSent() {
    if (this.timer != null && this.timer.runCount < 1) {
      window.clearTimeout(this.timer);
      this.timer.callback();
    }
  }
}
