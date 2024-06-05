import { Component, ChangeDetectorRef } from '@angular/core';
import { MenuItem } from 'src/app/interfaces/menu-item';
import { TemplatesServiceService } from 'src/app/services/templates-service.service';

interface Screenshot {
  id: string;
  imageUrl: string;
  name: string;
}

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.css']
})
export class TemplatesComponent {
  listItems: MenuItem[] = [
    { id: "1", name: 'Books to Read', icon: "assets/icons/left_menu/format_list_bulleted.svg"},
    { id: "2", name: 'Travel Kit', icon: "assets/icons/left_menu/format_list_bulleted.svg"},
  ];

  tableItems: MenuItem[] = [
    { id: "3", name: 'Weekly Routine', icon: "assets/icons/left_menu/format_list_bulleted.svg"},
  ];

  galleryItems: MenuItem[] = [
    { id: "4", name: 'Moodboard', icon: "assets/icons/left_menu/format_list_bulleted.svg"},
  ];

  boardItems: MenuItem[] = [
    {  id: "5", name: 'Personal Planning', icon: "assets/icons/left_menu/format_list_bulleted.svg"},
  ];

  templatesItems: MenuItem[] = [
    { name: 'List', icon: "assets/icons/left_menu/format_list_bulleted.svg", submenu: this.listItems},
    { name: 'Table', icon: "assets/icons/left_menu/table.svg", submenu: this.tableItems},
    { name: 'Gallery', icon: "assets/icons/left_menu/gallery_thumbnail.svg", submenu: this.galleryItems},
    { name: 'Board', icon: "assets/icons/left_menu/table_chart.svg", submenu: this.boardItems},
  ];

  screenshots: Screenshot[] = [
    { id: "1", imageUrl: "assets/templates/books_to_read.svg", name: "booksToRead" },
    { id: "2", imageUrl: "assets/templates/travel_kit.svg", name: "travelKit"  },
    { id: "3", imageUrl: "assets/templates/weekly_routine.svg", name: "weeklyRoutine"  },
    { id: "4", imageUrl: "assets/templates/moodboard.svg", name: "moodboard"  },
    { id: "5", imageUrl: "assets/templates/personal_planning.svg", name: "personalPlanning"  },
  ];

  activeElement: string = "1";
  
  constructor(private templatesService: TemplatesServiceService, private cdr: ChangeDetectorRef) {}

  isTemplateVisible(): boolean {
    return this.templatesService.templateVisible;
  }

  setActiveElement(id: string) {
    this.activeElement = id;
    console.log(this.activeElement);
    this.cdr.detectChanges(); // Force change detection
  }

  getActiveScreenshotUrl(): string {
    const activeScreenshot = this.screenshots.find(screenshot => screenshot.id === this.activeElement);
    return activeScreenshot ? activeScreenshot.imageUrl : '';
  }
}
