import { Component, ElementRef, OnInit, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { LeftMenuService } from 'src/app/services/left-menu.service';
import { HeaderService } from 'src/app/services/header.service';

interface MenuItem {
  name: string;
  submenu?: string[];
}

@Component({
  selector: 'app-leftmenu',
  templateUrl: './leftmenu.component.html',
  styleUrls: ['./leftmenu.component.css']
})
export class LeftmenuComponent implements AfterViewInit{
  
  constructor(private elementRef: ElementRef, private leftMenuService: LeftMenuService, private HeaderService: HeaderService) { }

  menuItems: MenuItem[] = [
    { name: 'Search' },
    { name: 'New Page' },
    { name: 'Templates' },
    { name: 'Personal Home', submenu: ['Element 1', 'Element 2', 'Element 3'] },
    { name: 'Task list', submenu: ['write html', 'write css', 'pet the cat'] }
  ];
  activeMenuItem: string | null = null;
  showDropdown: boolean = false;
  menuVisible: boolean = false;

  get leftMenuVisible(): boolean {
    return this.HeaderService.leftMenuVisible;
  }

  setActive(menuItem: string): void {
    this.activeMenuItem = menuItem;
    this.showDropdown = false; // скрыть выпадающее меню при выборе пункта меню
  }

  toggleDropdown(menuItem: string): void {
    this.activeMenuItem = this.activeMenuItem === menuItem ? null : menuItem;
    this.showDropdown = !this.showDropdown;
  }

  ngAfterViewInit(): void {
    const leftMenuElement = this.elementRef.nativeElement.querySelector('.left-menu');
    const menuWidth = window.getComputedStyle(leftMenuElement).getPropertyValue('width');
    console.log('Width of leftmenu:', menuWidth);
    this.leftMenuService.leftMenuWidth = parseInt(menuWidth, 10);
  }

}
