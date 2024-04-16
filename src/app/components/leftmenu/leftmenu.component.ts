import { Component, ElementRef, OnInit, AfterViewInit, Output, EventEmitter, Input } from '@angular/core';
import { NewPageService } from 'src/app/services/new-page.service';
import { SearchPageService } from 'src/app/services/search-page.service';
import { BigModalWindowService } from 'src/app/services/big-modal-window.service';

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
  
  constructor(private NewPageService: NewPageService, private SearchPageService: SearchPageService, private BigModalWindowService: BigModalWindowService) 
  {
    this.toggleNewPage = this.toggleNewPage.bind(this);
    this.toggleSearchPage = this.toggleSearchPage.bind(this);
  }

  @Input() menuVisible: boolean = false;
  ngOnInit(): void {
  }

  menuItemsUpper: MenuItem[] = [
    { name: 'Search', icon: "assets/icons/left_menu/search.svg", funcName: "toggleSearchPage" },
    { name: 'New Page', icon: "assets/icons/left_menu/add_circle.svg", funcName: "toggleNewPage"},
    { name: 'Templates', icon: "assets/icons/left_menu/extension.svg" },
  ];

  menuItemsMid: MenuItem[] = [
    { name: 'Quick Note', icon: "assets/icons/left_menu/attach_file.svg"},
    { name: 'Personal Home', icon: "assets/icons/left_menu/location_home.svg", submenu: ['Element 1', 'Element 2', 'Element 3'] },
    { name: 'Task list', icon: "assets/icons/left_menu/check.svg", submenu: ['write html', 'write css', 'pet the cat'] }
  ];

  menuItemsLower: MenuItem[] = [
    { name: 'Import', icon: "assets/icons/left_menu/upload.svg"},
    { name: 'Settings', icon: "assets/icons/left_menu/settings.svg", submenu: ['Element 1', 'Element 2', 'Element 3'] },
    { name: 'Trash', icon: "assets/icons/left_menu/delete.svg", submenu: ['write html', 'write css', 'pet the cat'] }
  ];
  activeMenuItem: string | null = null;
  showDropdown: boolean = false;

  toggleDropdown(menuItem: string): void {
  this.activeMenuItem = this.activeMenuItem === menuItem ? null : menuItem;
  this.showDropdown = this.activeMenuItem !== null; // Показываем подменю только если activeMenuItem не равен null
  }


  toggleNewPage() {
    this.NewPageService.newPageVisible = !this.NewPageService.newPageVisible;
    this.BigModalWindowService.modalVisible = this.NewPageService.newPageVisible;

  }

  toggleSearchPage() {
    this.SearchPageService.searchPageVisible = !this.SearchPageService.searchPageVisible;
    this.BigModalWindowService.modalVisible = this.SearchPageService.searchPageVisible;
    console.log(this.SearchPageService.searchPageVisible);
    console.log(this.BigModalWindowService.modalVisible);
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
