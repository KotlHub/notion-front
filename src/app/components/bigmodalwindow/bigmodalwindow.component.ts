import { Component, HostListener } from '@angular/core';
import { BigModalWindowService } from 'src/app/services/big-modal-window.service';

@Component({
  selector: 'app-bigmodalwindow',
  templateUrl: './bigmodalwindow.component.html',
  styleUrls: ['./bigmodalwindow.component.css']
})
export class BigmodalwindowComponent {

  constructor(private BigModalWindowService: BigModalWindowService) { }

  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    if (this.BigModalWindowService.modalVisible && event.key === "Escape") {
      this.BigModalWindowService.modalVisible = false;
    }
  }

  toggleVisible(event?: Event) {
    const modalContent = document.querySelector('.modal-content');
    if (this.BigModalWindowService.modalVisible && modalContent && !modalContent.contains(event?.target as Node)) {
      this.BigModalWindowService.modalVisible = !this.BigModalWindowService.modalVisible;
    }

    else if (!event && this.BigModalWindowService.modalVisible) {
      this.BigModalWindowService.modalVisible = !this.BigModalWindowService.modalVisible;
  }
  }

  

  isModalVisible(): boolean {
    return this.BigModalWindowService.modalVisible;
  }

}
