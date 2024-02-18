import { Component } from '@angular/core';

interface MenuItem {
  name: string;
  submenu?: string[];
}


@Component({
  selector: 'app-leftmenu',
  templateUrl: './leftmenu.component.html',
  styleUrls: ['./leftmenu.component.css']
})
export class LeftmenuComponent {
  menuItems: MenuItem[] = [
    { name: 'Search' },
    { name: 'New Page' },
    { name: 'Templates' },
    { name: 'Personal Home', submenu: ['Element 1', 'Element 2', 'Element 3'] },
    { name: 'Task list', submenu: ['write html', 'write css', 'pet the cat'] }
  ];
  activeMenuItem: string | null = null;
  showDropdown: boolean = false;

  setActive(menuItem: string): void {
    this.activeMenuItem = menuItem;
    this.showDropdown = false; // скрыть выпадающее меню при выборе пункта меню
  }

  toggleDropdown(menuItem: string): void {
    this.activeMenuItem = this.activeMenuItem === menuItem ? null : menuItem;
    this.showDropdown = !this.showDropdown;
  }
}
