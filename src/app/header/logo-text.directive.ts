import {Directive, Input, HostBinding} from '@angular/core';

@Directive({
  selector: '[appLogoText]'
})
export class LogoTextDirective {
  @HostBinding('style.color') color = 'white';
  @HostBinding('style.text-align') textAlign = 'center';
  @HostBinding('style.font-size') fontSize = '5vw';
  @HostBinding('style.padding') @Input('appLogoText') padding = '5vw/';

  constructor() {

  }

}