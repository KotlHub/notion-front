import { Component } from '@angular/core';
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
    { name: 'Empty page', icon: "assets/icons/attach_file.svg" },
    { name: 'Table', icon: "assets/icons/attach_file.svg"},
    { name: 'List', icon: "assets/icons/attach_file.svg" },
    { name: 'Template', icon: "assets/icons/attach_file.svg"},
  ];

  menuItemsRight: MenuItem[] = [
    { name: 'Board', icon: "assets/icons/location_home.svg"},
    { name: 'Calendar', icon: "assets/icons/check.svg" },
    { name: 'Gallery', icon: "assets/icons/check.svg" },
  ];
  constructor(private newPageService: NewPageService) { }

  isNewPageVisible(): boolean {
    return this.newPageService.newPageVisible;
  }
}
