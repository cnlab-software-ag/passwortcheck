import {PasswordPartial} from "./passwordPartial.model";

export class Word extends PasswordPartial{

  constructor(
      private partialUserInput: string,
      word: string,
      passwordStartIndex: number,
      passwordStopIndex: number,
      length: number,
      roomSize: number,
      source: string
  ) {
    super(
      "Wort",
      word,
      passwordStartIndex,
      passwordStopIndex,
      length,
      roomSize,
      source
    );
    this.partialUserInput = partialUserInput;
  }

  numberOfAttemps(){
    return this.roomSize;
  }

  displayedWord() {
    if (this.showToolTip()) {
      return this.partialUserInput + " (" + this.word + ")";
    }
    return this.word;
  }

  showToolTip() {
    return this.partialUserInput !== this.word
  }

}
