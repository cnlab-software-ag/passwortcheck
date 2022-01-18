import { Component } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styles: [`
    div {
        padding: 0;
        margin: 0;
    }
    .passwordCheckContainer {
        padding-top: 10px;
    }
    .sidebarContainer {
        padding-top: 10px;
    }
  `]
})
export class NavigationComponent {}
