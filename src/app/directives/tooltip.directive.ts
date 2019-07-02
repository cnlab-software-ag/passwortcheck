import {Directive, HostBinding, HostListener, ElementRef, Renderer2} from '@angular/core';

@Directive({
  selector: '[appTooltip]',
})
export class TooltipDirective {
  @HostBinding('style.border-bottom') borderBottom = '1px dotted';
  @HostBinding('style.position') position = 'relative';
  @HostBinding('style.cursor') cursor = 'help';

  span = null;

  constructor(private element: ElementRef, private renderer: Renderer2) {}

  @HostListener('click') onClick() {
    const el = this.element.nativeElement;

    if (el.children.length > 0) {
      this.renderer.setAttribute(el, 'title', this.span.innerHTML);
      el.removeChild(this.span);
    } else {
      this.span = this.renderer.createElement('span');
      this.renderer.addClass(this.span, 'tooltiptitle');
      this.renderer.appendChild(this.span, this.renderer.createText(el.title));
      this.renderer.appendChild(el, this.span);
      el.removeAttribute('title');
    }
  }
}
