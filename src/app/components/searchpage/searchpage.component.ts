import { Component, Directive, ElementRef, HostListener } from '@angular/core';
import { SearchPageService } from 'src/app/services/search-page.service';
import { BigModalWindowService } from 'src/app/services/big-modal-window.service';

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
  constructor(private SearchPageService: SearchPageService, private BigModalWindowService: BigModalWindowService) { }

  ListItems: MenuItem[] = [
    { name: 'Sort', icon: "assets/icons/search_page/swap_vert.svg", id: "sortButton"},
    { name: 'Title only', icon: "assets/icons/search_page/swap_vert.svg", id: "titleOnlyButton"},
    { name: 'Created by', icon: "assets/icons/search_page/swap_vert.svg", id: "createdByButton" },
    { name: 'In', icon: "assets/icons//search_page/attach_file.svg", id: "inButton"},
    { name: 'Date', icon: "assets/icons/search_page/swap_vert.svg", id: "dateButton" },
  ];

  isSortButtonsVisible: boolean = false;

  // @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
  //   if (this.SearchPageService.searchPageVisible && event.key === "Escape") {
  //     this.SearchPageService.searchPageVisible = false;
  //   }
  // }

  // toggleVisible(event?: Event) {
  //   const modalContent = document.querySelector('.modal-content');
  //   if (this.SearchPageService.searchPageVisible && modalContent && !modalContent.contains(event?.target as Node)) {
  //     this.SearchPageService.searchPageVisible = !this.SearchPageService.searchPageVisible;
  //   }

  //   else if (!event && this.SearchPageService.searchPageVisible) {
  //     this.SearchPageService.searchPageVisible = !this.SearchPageService.searchPageVisible;
  //   }
  // }

  isSearchPageVisible(): boolean {
    return this.SearchPageService.searchPageVisible;
  }

  toggleSortButtonsVisible()
  {
    this.isSortButtonsVisible = !this.isSortButtonsVisible;
  }



}
