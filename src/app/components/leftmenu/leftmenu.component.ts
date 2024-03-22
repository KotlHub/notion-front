import { Component, ElementRef, OnInit, AfterViewInit, Output, EventEmitter, Input } from '@angular/core';
import { NewPageService } from 'src/app/services/new-page.service';

interface MenuItem {
  name: string;
  icon: string;
  submenu?: string[];
  funcName?: string;
}

@Component({
  selector: 'app-leftmenu',
  templateUrl: './leftmenu.component.html',
  styleUrls: ['./leftmenu.component.css']
})
export class LeftmenuComponent implements OnInit {
  
  constructor(private NewPageService: NewPageService, ) {this.toggleNewPage = this.toggleNewPage.bind(this);}
  @Input() menuVisible: boolean = false;
  ngOnInit(): void {
  }

  menuItemsUpper: MenuItem[] = [
    { name: 'Search', icon: "assets/icons/attach_file.svg" },
    { name: 'New Page', icon: "assets/icons/attach_file.svg", funcName: "toggleNewPage"},
    { name: 'Templates', icon: "assets/icons/attach_file.svg" },
  ];

  menuItemsMid: MenuItem[] = [
    { name: 'Quick Note', icon: "assets/icons/attach_file.svg"},
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

  toggleNewPage() {
    this.NewPageService.newPageVisible = !this.NewPageService.newPageVisible;
    console.log(this.NewPageService.newPageVisible);
  }

  myFunction() {
    console.log('Hello from myFunction!');
  }

  [key: string]: any; // Index signature

  callFunction(item: any) {
    const func = this[item.funcName];
    if (typeof func === 'function') {
      func(); // This calls the function dynamically
    } else {
      console.error(`${item.funcName} is not a function.`);
    }
  }
}
