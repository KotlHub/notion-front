import { Component } from '@angular/core';
import { HeaderService } from 'src/app/services/header.service';

interface MenuItem {
  name: string;
  icon: string;
  funcName?: string;
}

@Component({
  selector: 'app-settingswindow',
  templateUrl: './settingswindow.component.html',
  styleUrls: ['./settingswindow.component.css']
})
export class SettingswindowComponent {

  constructor (private HeaderService: HeaderService) {}

  menuItemsUpper: MenuItem[] = [
    { name: 'Copy link', icon: "assets/icons/attach_file.svg" },
    { name: 'Duplicate', icon: "assets/icons/attach_file.svg"},
    { name: 'Move to', icon: "assets/icons/attach_file.svg" },
    { name: 'Delete', icon: "assets/icons/attach_file.svg"},
    { name: 'Show Deleted pages', icon: "assets/icons/attach_file.svg"},
  ];

  isSettingsWindowVisible(): boolean
  {
    return this.HeaderService.settingsWindowVisible;
  }
}
