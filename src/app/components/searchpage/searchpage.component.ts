import { Component, OnInit } from '@angular/core';
import { SearchPageService } from 'src/app/services/search-page.service';
import { LeftMenuService } from 'src/app/services/left-menu.service';
import { MenuItem } from 'src/app/interfaces/menu-item';
import { Router } from '@angular/router';

@Component({
  selector: 'app-searchpage',
  templateUrl: './searchpage.component.html',
  styleUrls: ['./searchpage.component.css']
})
export class SearchpageComponent implements OnInit {
  constructor(private SearchPageService: SearchPageService, private LeftMenuService: LeftMenuService, private router: Router) { }

  ListItems: MenuItem[] = [
    { name: 'Sort', icon: "assets/icons/search_page/swap_vert.svg", id: "sortButton", sortButtons: ['A-Z', 'Z-A']},
    { name: 'Type', icon: "assets/icons/search_page/swap_vert.svg", id: "typeButton", sortButtons: ['All', 'Empty page', 'Board', 'List', 'Gallery', 'Table']},
    { name: 'In', icon: "assets/icons/search_page/attach_file.svg", id: "inButton"},
    { name: 'Date', icon: "assets/icons/search_page/swap_vert.svg", id: "dateButton" },
  ];

  isSortButtonsVisible: boolean = false;
  searchText: string = '';
  filteredItems: MenuItem[] = [];
  originalItems: any[] = [];

  ngOnInit() {
    
    this.LeftMenuService.menuItemsMid.subscribe(items => {
      this.originalItems = items;
      this.filteredItems = items;
    });
  }

  isSearchPageVisible(): boolean {
    return this.SearchPageService.searchPageVisible;
  }

  toggleSortButtonsVisible() {
    this.isSortButtonsVisible = !this.isSortButtonsVisible;
  }

  onSearchInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchText = input.value;
    this.filterItems();
  }

  filterItems() {
    this.LeftMenuService.menuItemsMid.subscribe(items => {
      this.filteredItems = items.filter(item => item.name.toLowerCase().includes(this.searchText.toLowerCase()));
    });
  }

  sortItems(sortOrder: string) {
    switch (sortOrder) {
      case 'A-Z':
        this.filteredItems.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'Z-A':
        this.filteredItems.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'Empty page':
        this.filteredItems = this.originalItems.filter(item => item.icon === "assets/icons/left_menu/note_stack.svg");
        break;
      case 'Board':
        this.filteredItems = this.originalItems.filter(item => item.icon === "assets/icons/left_menu/table_chart.svg");
        break;
      case 'List':
        this.filteredItems = this.originalItems.filter(item => item.icon === "assets/icons/left_menu/format_list_bulleted.svg");
        break;
      case 'Gallery':
        this.filteredItems = this.originalItems.filter(item => item.icon === "assets/icons/left_menu/gallery_thumbnail.svg");
        break;
      case 'Table':
        this.filteredItems = this.originalItems.filter(item => item.icon === "assets/icons/left_menu/table.svg");
        break;
      case 'All':
        this.filteredItems = [...this.originalItems];
        this.filterItems();
        break;
      default:
        break;
    }
  }

  newRoute(link: string | undefined) {
    if(link != undefined)
    this.router.navigate([link]);
    this.filteredItems = [];
    this.searchText = "";
    this.SearchPageService.searchPageVisible = false;
  }
}