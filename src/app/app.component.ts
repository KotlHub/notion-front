import { Component } from '@angular/core';
import { LeftmenuComponent } from './components/leftmenu/leftmenu.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'notion-front';

  constructor(private router: Router) {}

  isRegistrationPageActive(): boolean {
    return this.router.url === '/registration';
  }
  menuVisible: boolean = false;
}
