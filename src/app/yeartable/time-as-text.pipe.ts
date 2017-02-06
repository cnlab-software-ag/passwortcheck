import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeAsText'
})
export class TimeAsTextPipe implements PipeTransform {

  transform(value: any, args?: any): string {
    if (value < 1) {
      return "Weniger als eine Sekunde";
    } else if (value < 60) {
      return this.formattedNumber(value) + " Sekunden";
    } else if (value < 3600) {
      return this.formattedNumber(value/60) + " Minuten";
    } else if (value < 86400) {
      return this.formattedNumber(value/3600) + " Stunden";
    } else if (value < 259200) {
      return this.formattedNumber(value/86400) + " Tage";
    } else if (value < 31536000) {
      return this.formattedNumber(value/2592000) + " Monate";
    } else if (value < 31536000000000) {
      return this.formattedNumber(value/31536000) + " Jahre";
    }
    return "Mehrere Millionen Jahre";
  }

  formattedNumber(number) {
    return number.toLocaleString('de-CH', {maximumFractionDigits: 0});
  }
}
