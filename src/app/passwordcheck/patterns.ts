export class Pattern {
  static digits: RegExp = (/\d+/);
  static lowerChars: RegExp = (/[a-zäöü]/);
  static upperChars: RegExp = (/[A-ZÄÖÜ]/);
  static specialChars: RegExp = (/[\+\"\*\ч\%\&\/\(\)\=\?\!\г\$\@\#\в\з\-\;\:\<\>\\\[\]\{\}\.\,\'\`\^\°\§\ \_\ç\€\£]/);

  static numbersAsLetter: { [key:string]:string }  = {
    '4': 'A',
    '@': 'A',
    '8': 'B',
    '(': 'C',
    '[': 'C',
    '<': 'C',
    '3': 'E',
    '€': 'E',
    '£': 'L',
    '6': 'G',
    '9': 'G',
    '#': 'H',
    '!': 'I',
    '1': 'L',
    '0': 'O',
    '5': 'S',
    '$': 'S',
    '7': 'T',
    '2': 'Z'
  };

}
