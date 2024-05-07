import { Component, Directive, ElementRef, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { NewPageService } from 'src/app/services/new-page.service';
import { GlobalValuesService } from 'src/app/services/global-values.service';
import { MenuItem } from 'src/app/interfaces/menu-item';

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
    { name: 'Gallery', icon: "assets/icons/new_page_modal/gallery_thumbnail.svg", funcName: "gallery" },
  ];
  activeItem: any | null = null;
  newPageName: string = '';

  constructor(private GlobalValuesService: GlobalValuesService, private newPageService: NewPageService, private router: Router) { }

  isNewPageVisible(): boolean {
    return this.newPageService.newPageVisible;
  }

  setActiveItem(item: any) {
    this.activeItem = item;
    
  }

  createNewPage() {
    if (this.activeItem && typeof this.activeItem.funcName === 'string') {
      this.newPageService.newPageName = this.newPageName;
      const funcName = this.activeItem.funcName;
      const id = this.GlobalValuesService.generateUUID();
      this.router.navigate(['/createnewpage', funcName, id ]);
      this.newPageService.newPageVisible = false;
      this.newPageName = '';
      this.newPageService.justCreated = true;
      console.log(this.newPageService.justCreated);
    } else {
      console.error('active item has no function');
    }
  }
}
