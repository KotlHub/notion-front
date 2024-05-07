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

  menuItemsLower: MenuItem[] = [
    { name: 'Import', icon: "assets/icons/left_menu/upload.svg"},
    { name: 'Settings', icon: "assets/icons/left_menu/settings.svg", submenu: ['Element 1', 'Element 2', 'Element 3'] },
    { name: 'Trash', icon: "assets/icons/left_menu/delete.svg", submenu: ['write html', 'write css', 'pet the cat'] }
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
    this.LeftMenuService.menuItemsMid.subscribe(items => {
      this.menuItemsMid = items;
    });

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.UserService.userToken}`,
    });

    const requestBody = { email: this.UserService.userEmail };

    console.log(requestBody);
    this.http.post<any>(this.GlobalValuesService.api + 'Values/getUserNotes', requestBody, {headers})
    .subscribe(response => {

      response.forEach((element: { name: any; iconPath: any; currentLink: any; id: any;}) => {
        const newItem: MenuItem = {
          name: element.name,
          icon: element.iconPath,
          currentLink: element.currentLink,
          id: element.id
        };
        this.LeftMenuService.addMenuItem(newItem);
      });
    }, error => {
      console.error('Error:', error);
    });

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

  deleteItem(item: MenuItem) {
    this.LeftMenuService.deleteItem(item);

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
