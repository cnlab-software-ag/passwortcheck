import { Pipe, PipeTransform } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Observable} from 'rxjs';

@Pipe({
  name: 'timeAsText'
})
export class TimeAsTextPipe implements PipeTransform {

  constructor(
    private translate: TranslateService,
  ) {}

  transform(value: any, title: string): Observable<string> {
    if (value < 1) {
      return this.translate.get('timeAsText.lessTenASecond');
    } else if (value < 60) {
      return this.translate.get('timeAsText.seconds', {value: this.formattedNumber(value)});
    } else if (value < 3600) {
      return this.translate.get('timeAsText.minutes', {value: this.formattedNumber(value / 60)});
    } else if (value < 86400) {
      return this.translate.get('timeAsText.hours', {value: this.formattedNumber(value / 3600)});
    } else if (value < 2592000) {
      return this.translate.get('timeAsText.days', {value: this.formattedNumber(value / 86400)});
    } else if (value < 31536000) {
      return this.translate.get('timeAsText.months', {value: this.formattedNumber(value / 2592000)});
    } else if (value < 31536000000000) {
      return this.translate.get('timeAsText.years', {value: this.formattedNumber(value / 31536000)});
    }
    return this.translate.get('timeAsText.severalMillionYears');
  }

  formattedNumber(number: number) {
    return number.toLocaleString('de-CH', {maximumFractionDigits: 0});
  }
}
