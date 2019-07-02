import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-yeartable',
  templateUrl: './yeartable.component.html',
  styles: [`
    .tooltiptitle {
      position: absolute;
      top: 30px;
      background: #bcc4c8;
      z-index: 999;
      padding: 4px;
      left: 0;
      display:block;
      text-wrap: normal;
      word-wrap: break-word;
    }
    .word-break {
      word-break: break-all;
    }
  `]
})
export class YeartableComponent {
  @Input() metrics;
  @Input() showpassword;
}

