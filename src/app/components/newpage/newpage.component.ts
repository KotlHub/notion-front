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
    { name: 'Empty page', icon: "assets/icons/new_page_modal/note_stack.svg", funcName: "emptypage" },
    { name: 'Table', icon: "assets/icons/new_page_modal/table.svg", funcName: "table"},
    { name: 'List', icon: "assets/icons/new_page_modal/format_list_bulleted.svg", funcName: "list" },
    { name: 'Template', icon: "assets/icons/new_page_modal/extension.svg", funcName: "template"},
  ];

  menuItemsRight: MenuItem[] = [
    { name: 'Board', icon: "assets/icons/new_page_modal/table_chart.svg", funcName: "board"},
    { name: 'Calendar', icon: "assets/icons/new_page_modal/calendar_month.svg", funcName: "calendar" },
    { name: 'Gallery', icon: "assets/icons/new_page_modal/gallery_thumbnail.svg", funcName: "Gallery" },
  ];
  activeItem: any | null = null;

  constructor(private newPageService: NewPageService, private router: Router) { }

  isNewPageVisible(): boolean {
    return this.newPageService.newPageVisible;
  }

  setActiveItem(item: any) {
    this.activeItem = item;
    
  }

  createNewPage() {
    if (this.activeItem && typeof this.activeItem.funcName === 'string') {
      const funcName = this.activeItem.funcName;
      this.router.navigate(['/createnewpage', funcName ]);
      this.newPageService.newPageVisible = false;
    } else {
      console.error('Активный элемент не имеет функции');
    }
  }
}
