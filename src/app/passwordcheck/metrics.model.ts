import * as Lazy from 'lazy.js';

import {Pattern} from './patterns';
import {RemainingChars} from "./remainingChars.model";

export class Metrics {
  password = "";
  wordIndexes = [];
  remainingPasswordChars: RemainingChars = new RemainingChars("", 0, 0, 0, 0);

  goodColor = '#66cc66';
  badColor = '#ff6666';

  upperLetterPoints = 15;
  lowerLetterPoints = 15;
  numberPoints = 10;
  specialCharPoints = 10;

  pointLimit = 100;
  timeLimit = 31536000;
  passwordCracksPerSeconds = 5000000000;

  pwlengthPoints(){
    return this.password.length * 5;
  }

  inWordbookPoints(){
    let points = 0;

    Lazy(this.wordIndexes).each(function(word){
      points -= word.length * 3
    });

    return points;
  }

  getUpperLetterPoints() {
    return Pattern.upperChars.test(this.remainingPasswordChars.word) ? this.upperLetterPoints : 0;
  }

  getLowerLetterPoints() {
    return Pattern.lowerChars.test(this.remainingPasswordChars.word) ? this.lowerLetterPoints : 0;
  }

  getNumberPoints() {
    return Pattern.digits.test(this.remainingPasswordChars.word) ? this.numberPoints : 0;
  }

  getSpecialCharPoints() {
    return Pattern.specialChars.test(this.remainingPasswordChars.word) ? this.specialCharPoints : 0;
  }

  totalPoints() {
    return this.pwlengthPoints() +
      this.inWordbookPoints() +
      this.getUpperLetterPoints() +
      this.getLowerLetterPoints() +
      this.getNumberPoints() +
      this.getSpecialCharPoints()
  }

  totalPointsStyle() {
    if(this.totalPoints() >= this.pointLimit) {
      return this.goodColor;
    }
    return this.badColor;
  }

  allWords() {
    let allWords = this.wordIndexes.slice(0);
    if (this.remainingPasswordChars.length > 0) {
      allWords.push(this.remainingPasswordChars);
    }
    return allWords;
  }

  numberOfAttemps(){
    let product = 1;
    Lazy(this.allWords()).each((word) => { product *= word.numberOfAttemps(); });
    return product;
  }

  entropie() {
    let sum = 0;
    Lazy(this.allWords()).each((word) => { return sum += word.entropie(); });
    return sum;
  }

  timeToBreak() {
    return this.numberOfAttemps() / this.passwordCracksPerSeconds;
  }

  timeToBreakColor(){
    if (this.timeToBreak() >= this.timeLimit) {
      return this.goodColor;
    }
    return this.badColor;
  }

}

