import {PasswordPartial} from "./passwordPartial.model";

export class RemainingChars extends PasswordPartial {

  constructor(
    word: string,
    passwordStartIndex: number,
    passwordStopIndex: number,
    length: number,
    roomSize: number
  ) {
    super(
      "Zeichen",
      word,
      passwordStartIndex,
      passwordStopIndex,
      length,
      roomSize,
      "übrige Zeichen"
    );
  }

  numberOfAttemps(){
    return Math.pow(this.roomSize, this.word.length);
  }

  displayedWord() {
    return this.word;
  }
}
