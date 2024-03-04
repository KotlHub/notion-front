import { Component } from '@angular/core';
import { LeftmenuComponent } from './components/leftmenu/leftmenu.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'notion-front';
  menuVisible: boolean = false;
}
