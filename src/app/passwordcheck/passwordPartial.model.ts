export abstract class PasswordPartial {

  constructor(
    public type: string,
    public word: string,
    public passwordStartIndex: number,
    public passwordStopIndex: number,
    public length: number,
    public roomSize: number,
    public source: string
  ){}

  abstract numberOfAttemps() : number;

  abstract displayedWord() : string;

  entropie() {
    return Math.log(this.numberOfAttemps()) / Math.log(2);
  }

  showToolTip() {
    return false;
  }

}
