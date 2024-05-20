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
    { name: 'Sort', icon: "assets/icons/search_page/swap_vert.svg", id: "sortButton"},
    { name: 'Title only', icon: "assets/icons/search_page/swap_vert.svg", id: "titleOnlyButton"},
    { name: 'Created by', icon: "assets/icons/search_page/swap_vert.svg", id: "createdByButton" },
    { name: 'In', icon: "assets/icons/search_page/attach_file.svg", id: "inButton"},
    { name: 'Date', icon: "assets/icons/search_page/swap_vert.svg", id: "dateButton" },
  ];

  isSortButtonsVisible: boolean = false;
  searchText: string = '';
  filteredItems: MenuItem[] = [];

  ngOnInit() {
    this.LeftMenuService.menuItemsMid.subscribe(items => {
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

  newRoute(link: string | undefined) {
    if(link != undefined)
    this.router.navigate([link]);
    this.filteredItems = [];
    this.searchText = "";
    this.SearchPageService.searchPageVisible = false;
  }
}
