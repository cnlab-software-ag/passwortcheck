import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-yeartable',
  templateUrl: './yeartable.component.html',
  styles: [`
    .tooltiptitle {
      position: absolute;
      top: 30px;
      background: #bcc4c8;
      padding: 4px;
      left: 0;
      display:block;
      text-wrap: normal;
      word-wrap: break-word;
    }
  `]
})
export class YeartableComponent {
  @Input() metrics;
  @Input() showpassword;
}

