import { Component, Directive, ElementRef, HostListener } from '@angular/core';
import { SearchPageService } from 'src/app/services/search-page.service';

interface MenuItem {
  name: string;
  icon: string;
  submenu?: string[];
  funcName?: string;
  id: string;
}

@Component({
  selector: 'app-searchpage',
  templateUrl: './searchpage.component.html',
  styleUrls: ['./searchpage.component.css']
})
export class SearchpageComponent {
  constructor(private SearchPageService: SearchPageService) { }

  ListItems: MenuItem[] = [
    { name: 'Sort', icon: "assets/icons/search_page/swap_vert.svg", id: "sortButton"},
    { name: 'Title only', icon: "assets/icons/search_page/swap_vert.svg", id: "titleOnlyButton"},
    { name: 'Created by', icon: "assets/icons/search_page/swap_vert.svg", id: "createdByButton" },
    { name: 'In', icon: "assets/icons//search_page/attach_file.svg", id: "inButton"},
    { name: 'Date', icon: "assets/icons/search_page/swap_vert.svg", id: "dateButton" },
  ];

  isSortButtonsVisible: boolean = false;

  isSearchPageVisible(): boolean {
    console.log("Hello from isSearchPageVisible!");
    return this.SearchPageService.searchPageVisible;
  }

  toggleSortButtonsVisible()
  {
    this.isSortButtonsVisible = !this.isSortButtonsVisible;
  }



}
