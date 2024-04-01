import { Component } from '@angular/core';
import { LeftmenuComponent } from './components/leftmenu/leftmenu.component';
import { Router } from '@angular/router';
import { SettingsModalWindowService } from './services/settings-modal-window.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'notion-front';
  menuVisible: boolean = false;
  constructor(private router: Router, private SettingsModalWindowService: SettingsModalWindowService) {}

  // isRegistrationPageActive(): boolean {
  //   return this.router.url === '/registration';
  // }

  isFullWidth(): boolean {
    return this.SettingsModalWindowService.fullWidth;
  }
  
}
