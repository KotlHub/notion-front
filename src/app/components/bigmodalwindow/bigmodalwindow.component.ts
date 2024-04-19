import { Component, HostListener } from '@angular/core';
import { BigModalWindowService } from 'src/app/services/big-modal-window.service';
import { NewPageService } from 'src/app/services/new-page.service';
import { SearchPageService } from 'src/app/services/search-page.service';
import { EditCardBoardService } from 'src/app/services/edit-card-board.service';
import { EditCardListService } from 'src/app/services/edit-card-list.service';

@Component({
  selector: 'app-bigmodalwindow',
  templateUrl: './bigmodalwindow.component.html',
  styleUrls: ['./bigmodalwindow.component.css']
})
export class BigmodalwindowComponent {

  constructor(private NewPageService: NewPageService, 
    private SearchPageService: SearchPageService, 
    private BigModalWindowService: BigModalWindowService, 
    private EditCardBoardService: EditCardBoardService, 
    private EditCardListService: EditCardListService) { }

  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    if (this.BigModalWindowService.modalVisible && event.key === "Escape") {
      this.BigModalWindowService.modalVisible = false;
      this.NewPageService.newPageVisible = false;
      this.SearchPageService.searchPageVisible = false;
      this.EditCardBoardService.editCardBoardVisible = false;
      this.EditCardListService.editCardListVisible = false;
    }
  }

  toggleVisible(event?: Event) {
    console.log("Hello from toggleVisibleBig!");
    const modalContent = document.querySelector('.modal-content');
    if (this.BigModalWindowService.modalVisible && modalContent && !modalContent.contains(event?.target as Node)) {
      this.BigModalWindowService.modalVisible = !this.BigModalWindowService.modalVisible;
      this.NewPageService.newPageVisible = false;
      this.SearchPageService.searchPageVisible = false;
      this.EditCardBoardService.editCardBoardVisible = false;
      this.EditCardListService.editCardListVisible = false;
    }

    else if (!event && this.BigModalWindowService.modalVisible) {
      this.BigModalWindowService.modalVisible = !this.BigModalWindowService.modalVisible;
      this.NewPageService.newPageVisible = false;
      this.SearchPageService.searchPageVisible = false;
      this.EditCardBoardService.editCardBoardVisible = false;
      this.EditCardListService.editCardListVisible = false;
  }
  }

  

  isModalVisible(): boolean {
    console.log("Hello from isModalVisible!");
    return this.BigModalWindowService.modalVisible;
  }

}
