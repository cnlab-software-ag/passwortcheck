import {ChangeDetectorRef, Component, HostListener} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [`
    div {
      height: 100%;
      padding: 0;
      margin: 0;
    }
  `]
})
export class HeaderComponent {
  constructor(
    private cdr: ChangeDetectorRef,
  ) {}

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.cdr.detectChanges();
  }

  appLogoTextPadding(logo): string {
    if (logo.clientHeight === 0) {
      setTimeout(() => {}, 20);
    }
    return (logo.clientHeight / 8) + 'px';
  }
}
