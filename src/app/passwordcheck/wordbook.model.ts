export class Wordbook {
  constructor(
    public lang: string,
    public name: string,
    public source: string,
    public file: string,
    public words: string[],
    public active: boolean,
    public displayed: boolean,
    public normalized: boolean
  ) {}
}
