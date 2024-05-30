import { Component, ElementRef, OnInit, AfterViewInit, Output, EventEmitter, Input } from '@angular/core';
import { NewPageService } from 'src/app/services/new-page.service';
import { SearchPageService } from 'src/app/services/search-page.service';
import { BigModalWindowService } from 'src/app/services/big-modal-window.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalValuesService } from 'src/app/services/global-values.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { LeftMenuService } from 'src/app/services/left-menu.service';
import { MenuItem } from 'src/app/interfaces/menu-item';


@Component({
  selector: 'app-leftmenu',
  templateUrl: './leftmenu.component.html',
  styleUrls: ['./leftmenu.component.css']
})
export class LeftmenuComponent implements OnInit {

    menuItemsUpper: MenuItem[] = [
    { name: 'Search', icon: "assets/icons/left_menu/search.svg", funcName: "toggleSearchPage" },
    { name: 'New Page', icon: "assets/icons/left_menu/add_circle.svg", funcName: "toggleNewPage"},
    { name: 'Templates', icon: "assets/icons/left_menu/extension.svg" },
  ];

  menuItemsMid: MenuItem[] = [

  ];
  trashItems: MenuItem[] = [
  ];

  favouriteItems: MenuItem[] = [

  ];

  menuItemsLower: MenuItem[] = [
    { name: 'Settings', icon: "assets/icons/left_menu/settings.svg", },
    { name: 'Trash', icon: "assets/icons/left_menu/delete.svg", submenu: this.trashItems }
  ];

  

  constructor(private NewPageService: NewPageService, 
    private SearchPageService: SearchPageService, private GlobalValuesService: GlobalValuesService,
    private UserService: UserService, private LeftMenuService: LeftMenuService,
    private BigModalWindowService: BigModalWindowService, private http: HttpClient,
    private router: Router) 
  {
    this.toggleNewPage = this.toggleNewPage.bind(this);
    this.toggleSearchPage = this.toggleSearchPage.bind(this);

  }

  @Input() menuVisible: boolean = false;



  activeMenuItem: string | null = null;
  showDropdown: boolean = false;

  ngOnInit(): void {
    this.LeftMenuService.menuItemsMid.subscribe((items: MenuItem[]) => {
      this.menuItemsMid = items;
    });

    this.LeftMenuService.trashItems.subscribe((items: MenuItem[]) => {
      this.trashItems = items;
      this.menuItemsLower.forEach(item => {
        if (item.name === 'Trash' && this.trashItems.length > 0) {
          item.submenu = this.trashItems;
        }
      });
    });

    this.LeftMenuService.favouriteItems.subscribe((items: MenuItem[]) => {
      this.favouriteItems = items;
    });

    console.log(this.trashItems);

    this.LeftMenuService.getMenu();
    this.LeftMenuService.getTrash();

  }


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

  addToFavourites(item: MenuItem)
  {
    this.LeftMenuService.addToFavourites(item);
  }

  deleteItem(item: MenuItem) {
    this.LeftMenuService.deleteItem(item);
  }
  
  recoverItem(item: MenuItem) {
    this.LeftMenuService.recoverItem(item);
  }


  [key: string]: any; // Index signature
  callFunction(item: any) {
    const func = this[item.funcName];
    if (typeof func === 'function') {
      func(); // This calls the function dynamically
    } 
    else {
      console.error(`${item.funcName} is not a function.`);
    }
  }

  newRoute(link: string | undefined) {
    if(link != undefined)
    this.router.navigate([link]);
  }
}
