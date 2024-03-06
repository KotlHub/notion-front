import { Component, ElementRef, OnInit, AfterViewInit, Output, EventEmitter, Input } from '@angular/core';
import { LeftMenuService } from 'src/app/services/left-menu.service';
import { HeaderService } from 'src/app/services/header.service';

interface MenuItem {
  name: string;
  icon: string;
  submenu?: string[];
}

@Component({
  selector: 'app-leftmenu',
  templateUrl: './leftmenu.component.html',
  styleUrls: ['./leftmenu.component.css']
})
export class LeftmenuComponent implements OnInit {
  
  constructor(private elementRef: ElementRef, private leftMenuService: LeftMenuService, private HeaderService: HeaderService) { }
  @Input() menuVisible: boolean = false;
  ngOnInit(): void {
  }
  
  menuItems: MenuItem[] = [
    { name: 'Search', icon: "assets/icons/attach_file.svg" },
    { name: 'New Page', icon: "assets/icons/attach_file.svg"},
    { name: 'Templates', icon: "assets/icons/attach_file.svg" },
    { name: 'Quick Note', icon: "assets/icons/attach_file.svg" },
    { name: 'Personal Home', icon: "assets/icons/location_home.svg", submenu: ['Element 1', 'Element 2', 'Element 3'] },
    { name: 'Task list', icon: "assets/icons/check.svg", submenu: ['write html', 'write css', 'pet the cat'] }
  ];
  activeMenuItem: string | null = null;
  showDropdown: boolean = false;
  activeItem: number | null = null;
 
  setActive(menuItem: string): void {
    this.activeMenuItem = menuItem;
    this.showDropdown = false;
  }

  toggleDropdown(menuItem: string): void {
  this.activeMenuItem = this.activeMenuItem === menuItem ? null : menuItem;
  this.showDropdown = this.activeMenuItem !== null; // Показываем подменю только если activeMenuItem не равен null
  }

  setActiveItem(index: number) {
    this.activeItem = index;
  }

  clearActiveItem() {
    this.activeItem = null;
  }


}
