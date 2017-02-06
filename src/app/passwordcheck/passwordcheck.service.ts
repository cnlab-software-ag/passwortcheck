import {Injectable} from "@angular/core";
import {Http, Headers} from "@angular/http";
import * as Lazy from 'lazy.js';

import {Pattern} from "./patterns";

import {Word} from "./word.model";
import {Character} from "./characters.model";
import {RemainingChars} from "./remainingChars.model";
import {Wordbook} from "./wordbook.model";
import {PasswordPartial} from "./passwordPartial.model";

@Injectable()
export class PasswordcheckService {
  timer = null;

  constructor(private http: Http){}

  normalizedPassword(password) {
    let pwChars = Lazy(password).split('');
    let result = [];
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
    let matrix: PasswordPartial[][] = this.computeMatrix(wordbooks, userInput);
    return this.findeShortestPath(matrix);
  }

  computeMatrix(wordbooks: Wordbook[], userInput: string) {
    let matrix: PasswordPartial[][] = [];
    for(let i = 0; i < userInput.length; i++){
      matrix[i] = [];
    }

    Lazy(wordbooks).each( (wordbook) => {
      let charRoomSize = this.remainingCharRoomSize(userInput);
      let password = userInput;
      let normalizedRoomSizeMultiplier = 1;
      if(wordbook.normalized){
        password = this.normalizedPassword(userInput);
        normalizedRoomSizeMultiplier = 10;
      }

      for (let i = 0; i < password.length; i++) {
        for (let j = i; j < password.length; j++) {
          let partialPassword = Lazy(password).substring(i, j + 1).toString();
          let index = Lazy(wordbook.words).sortedIndex(partialPassword).toString();
          if (wordbook.words[index] === partialPassword) {
            let partialUserInput = Lazy(userInput).substring(i, j + 1).toString();
            let effectiveRoomSizeMultiplier = partialUserInput.toLowerCase() === wordbook.words[index] ? 1 : normalizedRoomSizeMultiplier;
            let word = new Word(
                partialUserInput,
              wordbook.words[index], i, i + partialPassword.length - 1, partialPassword.length,
              wordbook.words.length * effectiveRoomSizeMultiplier, wordbook.source
            );
            matrix[i][j] = word;
          } else if (partialPassword.length === 1) {
            let word = new Character(partialPassword, i, i, partialPassword.length, charRoomSize);
            matrix[i][j] = word;
          }
        }
      }
    });

    return matrix
  }

  findeShortestPath(matrix: PasswordPartial[][]) {
    let indexes: PasswordPartial[] = [];
    let nodes: PasswordPartial[] = [];
    let path: number[] = [];
    for (let u = 0; u < matrix.length; u++) {
      for (let v = 0; v <= u; v++) {
        if (matrix[v][u] != null) {
          let edge = matrix[v][u];
          let lastEdgeEntropie = path[u - edge.length] != null ? path[u - edge.length] : 0;
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
      let word = nodes[i];
      indexes.push(word);
      i -= word.length;
    }
    return Lazy(indexes).filter((item) => {
      return item.type != "Zeichen";
    }).reverse().toArray();
  }

  remainingChars(words: PasswordPartial[], password: string) {
    let remainingChars = "";
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
    if (Pattern.digits.test(passwordPart)) roomsize += 10;
    if (Pattern.lowerChars.test(passwordPart)) roomsize += 26;
    if (Pattern.upperChars.test(passwordPart)) roomsize += 26;
    if (Pattern.specialChars.test(passwordPart)) roomsize += 40;
    return roomsize;
  }

  getUserText(metrics) {
    let points = metrics.totalPoints();
    let years = metrics.timeToBreak();
    let pointLimit = metrics.pointLimit;
    let timeLimit = metrics.timeLimit;
    let usertext = "";
    let strong: boolean = false;
    if (years >= timeLimit && points >= pointLimit) {
      usertext = ", weil es bei der Regelbewertung mehr als 100 Punkte erhält, und weil die geschätzte Zeit für die Suche über einem Jahr ist.";
      strong = true;
    } else {
      if (points < pointLimit && years >= timeLimit) {
        usertext = ", weil es bei der Regelbewertung weniger als 100 Punkte erhält.";
      } else if (years < timeLimit && points >= pointLimit) {
        usertext = ", weil die geschätzte Zeit für die Suche unter einem Jahr ist.";
      } else {
        usertext = ", weil es bei der Regelbewertung weniger als 100 Punkte erhält und weil die geschätzte Zeit für die Suche unter einem Jahr ist.";
      }
    }
    return {usertext: usertext, strong: strong};
  }

  sendStateToServerAfterTimeout(state: boolean){
    window.clearTimeout(this.timer);
    this.timer = window.setTimeout(() => this.sendStateToServer(state), 3000);
  }

  sendStateToServer(state: boolean){
    window.clearTimeout(this.timer);
    let body: string = "result=" + (state ? "1" : "0");
    let headers: Headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
    this.http.post("resultimport.php", body, { headers: headers }).subscribe(
      () => {},
      () => {}
    );
  }

  sendStateToServerIfNotSent(){
    if(this.timer != null && this.timer.runCount < 1) {
      window.clearTimeout(this.timer);
      this.timer.callback();
    }
  }
}
