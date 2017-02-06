import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bigNumberFormat'
})
export class BigNumberFormatPipe implements PipeTransform {

  transform(value: any, args?: any): number {
    if(value > 1000000000) {
      return value.toExponential(3);
    }
    return value.toLocaleString('de-CH', {maximumFractionDigits: 0});
  }

}
