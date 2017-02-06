import {Directive, Input, HostBinding, ElementRef} from '@angular/core';

@Directive({
  selector: '[appTimeAsText]'
})
export class TimeAsTextDirective {
  @HostBinding('style.background-color') backgroundColor = '#bcc4c8';

  constructor(private elementRef: ElementRef) {
    elementRef.nativeElement.innterHTML = 10;
  }

}
