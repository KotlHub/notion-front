import { Component, Directive, ElementRef, HostListener } from '@angular/core';
import { SearchPageService } from 'src/app/services/search-page.service';

@Component({
  selector: 'app-searchpage',
  templateUrl: './searchpage.component.html',
  styleUrls: ['./searchpage.component.css']
})
export class SearchpageComponent {
  constructor(private SearchPageService: SearchPageService) { }

  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    if (this.SearchPageService.searchPageVisible && event.key === "Escape") {
      this.SearchPageService.searchPageVisible = false;
    }
  }

  toggleVisible(event?: Event) {
    const modalContent = document.querySelector('.modal-content');
    if (this.SearchPageService.searchPageVisible && modalContent && !modalContent.contains(event?.target as Node)) {
      this.SearchPageService.searchPageVisible = !this.SearchPageService.searchPageVisible;
    }

    else if (!event && this.SearchPageService.searchPageVisible) {
      this.SearchPageService.searchPageVisible = !this.SearchPageService.searchPageVisible;
  }
  }

  

  isSearchPageVisible(): boolean {
    return this.SearchPageService.searchPageVisible;
  }
}
