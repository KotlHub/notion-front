import { Component, Directive, ElementRef, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { NewPageService } from 'src/app/services/new-page.service';

interface MenuItem {
  name: string;
  icon: string;
  funcName?: string;
}

@Component({
  selector: 'app-newpage',
  templateUrl: './newpage.component.html',
  styleUrls: ['./newpage.component.css']
})
export class NewpageComponent {

  menuItemsLeft: MenuItem[] = [
    { name: 'Empty page', icon: "assets/icons/attach_file.svg", funcName: "emptypage" },
    { name: 'Table', icon: "assets/icons/attach_file.svg", funcName: "table"},
    { name: 'List', icon: "assets/icons/attach_file.svg", funcName: "list" },
    { name: 'Template', icon: "assets/icons/attach_file.svg", funcName: "template"},
  ];

  menuItemsRight: MenuItem[] = [
    { name: 'Board', icon: "assets/icons/location_home.svg", funcName: "board"},
    { name: 'Calendar', icon: "assets/icons/check.svg", funcName: "calendar" },
    { name: 'Gallery', icon: "assets/icons/check.svg", funcName: "Gallery" },
  ];
  activeItem: any | null = null;

  constructor(private newPageService: NewPageService, private router: Router) { }

  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    if (this.newPageService.newPageVisible && event.key === "Escape") {
      this.newPageService.newPageVisible = false;
    }
  }

  toggleVisible(event?: Event) {
    const modalContent = document.querySelector('.modal-content');
    if (this.newPageService.newPageVisible && modalContent && !modalContent.contains(event?.target as Node)) {
      this.newPageService.newPageVisible = !this.newPageService.newPageVisible;
    }

    else if (!event && this.newPageService.newPageVisible) {
      this.newPageService.newPageVisible = !this.newPageService.newPageVisible;
  }
  }

  isNewPageVisible(): boolean {
    return this.newPageService.newPageVisible;
  }

  setActiveItem(item: any) {
    this.activeItem = item;
    
  }

  createNewPage() {
    if (this.activeItem && typeof this.activeItem.funcName === 'string') {
      //const funcName = this.activeItem.funcName;
      this.router.navigate(['/createnewpage']);
      this.newPageService.newPageVisible = false;
    } else {
      console.error('Активный элемент не имеет функции');
    }
  }
}
