import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-pointtable',
  templateUrl: './pointtable.component.html'
})
export class PointtableComponent {
  @Input() metrics;
}
