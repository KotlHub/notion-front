import { Component } from '@angular/core';
import { HeaderService } from 'src/app/services/header.service';
import { SettingsModalWindowService } from 'src/app/services/settings-modal-window.service';

interface MenuItem {
  name: string;
  icon: string;
  funcName?: string;
}

interface CheckboxItem {
  label: string;
  checked: boolean;
  id: string;
}

@Component({
  selector: 'app-settingswindow',
  templateUrl: './settingswindow.component.html',
  styleUrls: ['./settingswindow.component.css']
})
export class SettingswindowComponent {

  constructor (private HeaderService: HeaderService, private SettingsModalWindowService: SettingsModalWindowService) {}

  menuItemsUpper: MenuItem[] = [
    { name: 'Copy link', icon: "assets/icons/attach_file.svg" },
    { name: 'Duplicate', icon: "assets/icons/attach_file.svg"},
    { name: 'Move to', icon: "assets/icons/attach_file.svg" },
    { name: 'Delete', icon: "assets/icons/attach_file.svg"},
    { name: 'Show Deleted pages', icon: "assets/icons/attach_file.svg"},
  ];

  menuItemsBottom: MenuItem[] = [
    { name: 'Import', icon: "assets/icons/attach_file.svg" },
    { name: 'Export', icon: "assets/icons/attach_file.svg"},
  ];

  checkboxes: CheckboxItem[] = [
    { label: 'Small text', checked: false, id: "smallText" },
    { label: 'Lock page', checked: false, id: "lockPage" },
    { label: 'Full width', checked: false, id: "fullWidth" }
  ];

  lastEditedDate: Date = new Date();
  lastEditedBy: string = "Kurt Cobain";

  isSettingsWindowVisible(): boolean
  {
    return this.HeaderService.settingsWindowVisible;
  }

  onCheckboxChange(checkbox: CheckboxItem) {
    console.log('Checkbox value:', checkbox.checked);
    if (checkbox.id === 'fullWidth') {
      this.SettingsModalWindowService.fullWidth = !this.SettingsModalWindowService.fullWidth;
    }
  }
}
