import { Component } from '@angular/core';

@Component({
  selector: 'app-password-hints',
  templateUrl: './password-hints.component.html',
  styles: [`
    .c {
      margin-top: 12px;
    }
    
    .toolTipTitle {
      position: absolute;
      top: 20px;
      background: silver;
      padding: 4px;
      left: 0;
      white-space: nowrap;
    }
  `]
})
export class PasswordHintsComponent {}
