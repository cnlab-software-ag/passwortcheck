import {Directive, HostBinding, HostListener, ElementRef, Renderer} from '@angular/core';

@Directive({
  selector: '[appTooltip]',
})
export class TooltipDirective {
  @HostBinding('style.border-bottom') borderBottom = '1px dotted';
  @HostBinding('style.position') position = 'relative';
  @HostBinding('style.cursor') cursor = 'help';

  span = null;

  constructor(private element: ElementRef, private renderer: Renderer) {}

  @HostListener('click') onClick() {
    let el = this.element.nativeElement;

    if (el.children.length > 0) {
      this.renderer.setElementAttribute(el, "title", this.span.innerHTML);
      el.removeChild(this.span);
    } else {
      this.span = this.renderer.createElement(el, "span");
      this.renderer.setElementClass(this.span, "tooltiptitle", true);
      this.renderer.createText(this.span, el.title);
      el.removeAttribute("title");
    }
  }
}
