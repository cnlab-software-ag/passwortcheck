import {Directive, HostBinding, Input} from '@angular/core';

@Directive({
  selector: '[appLogoBlock]'
})
export class LogoBlockDirective {
  @HostBinding('style.background-color') @Input('backgroundColor') backgroundColor = 'white';
  @HostBinding('style.height') @Input('height') height = '15vh';
}
