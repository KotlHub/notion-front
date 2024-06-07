import { Component, ChangeDetectorRef } from '@angular/core';
import { MenuItem } from 'src/app/interfaces/menu-item';
import { TemplatesServiceService } from 'src/app/services/templates-service.service';
import { GlobalValuesService } from 'src/app/services/global-values.service';
import { CreateNewUserItemService } from 'src/app/services/create-new-user-item.service';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { UserService } from 'src/app/services/user.service';
import { HttpClient } from '@angular/common/http';

interface Screenshot {
  id: string;
  imageUrl: string;
  name: string;
  linkName: string;
  iconUrl: string;
  header: string;
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
    { id: "1", imageUrl: "assets/templates/books_to_read.svg", name: "booksToRead", linkName: '/createnewpage/list/', iconUrl: "assets/icons/left_menu/format_list_bulleted.svg", header: "Books to Read" },
    { id: "2", imageUrl: "assets/templates/travel_kit.svg", name: "travelKit", linkName: '/createnewpage/list/' , iconUrl: "assets/icons/left_menu/format_list_bulleted.svg", header: "Travel Kit" },
    { id: "3", imageUrl: "assets/templates/weekly_routine.svg", name: "weeklyRoutine", linkName: '/createnewpage/table/', iconUrl: "assets/icons/left_menu/table.svg", header: "Weekly Routine" },
    { id: "4", imageUrl: "assets/templates/moodboard.svg", name: "moodboard", linkName: '/createnewpage/gallery/', iconUrl: "assets/icons/left_menu/gallery_thumbnail.svg", header: "Moodboard"  },
    { id: "5", imageUrl: "assets/templates/personal_planning.svg", name: "personalPlanning", linkName: '/createnewpage/board/', iconUrl: "assets/icons/left_menu/table_chart.svg", header: "Personal Planning" },
  ];

  activeElement: string = "1";
  
  constructor(private templatesService: TemplatesServiceService, private cdr: ChangeDetectorRef,
    private GlobalValuesService: GlobalValuesService, private CreateNewUserItemService: CreateNewUserItemService,
    private router: Router, private UserService: UserService, private http: HttpClient
  ) {}

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

  getActiveScreenshotName(): string {
    const activeScreenshot = this.screenshots.find(screenshot => screenshot.id === this.activeElement);
    return activeScreenshot ? activeScreenshot.name : '';
  }

  getActiveScreenshotLink(): string {
    const activeScreenshot = this.screenshots.find(screenshot => screenshot.id === this.activeElement);
    return activeScreenshot ? activeScreenshot.linkName : '';
  }

  getActiveScreenshotIcon(): string {
    const activeScreenshot = this.screenshots.find(screenshot => screenshot.id === this.activeElement);
    return activeScreenshot ? activeScreenshot.iconUrl : '';
  }

  getActiveScreenshotHeader(): string {
    const activeScreenshot = this.screenshots.find(screenshot => screenshot.id === this.activeElement);
    return activeScreenshot ? activeScreenshot.header : '';
  }

  getTemplate() {
    const templateName = this.getActiveScreenshotName();
    const templateLink = this.getActiveScreenshotLink();
    const templateIcon = this.getActiveScreenshotIcon();
    const templateHeader = this.getActiveScreenshotHeader();

    const newUUID = this.GlobalValuesService.generateUUID();
    const newLink = templateLink + newUUID;

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.UserService.userToken}`,
    });

    const requestBody = { 
      email: this.UserService.userEmail,
      noteId: newUUID,
      templateName: templateName,
      currentLink: newLink
    };

    if(templateLink === "/createnewpage/gallery/")
      {console.log("gallery")}
    else {
      this.http.post<any>(this.GlobalValuesService.api + 'Values/getTemplate', requestBody, {headers})
        .subscribe(response => {
          console.log('Response:', response);

          if (response && response.status) {
            this.CreateNewUserItemService.createNewMenuItem(templateHeader, newUUID, newLink, templateIcon);
          this.router.navigate([newLink]);
          this.templatesService.templateVisible = false;
          }
        }, error => {
          console.error('Error:', error);
        });
    }

  }
}
