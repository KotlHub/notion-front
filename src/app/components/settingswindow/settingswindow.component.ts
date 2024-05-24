import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { HeaderService } from 'src/app/services/header.service';
import { SettingsModalWindowService } from 'src/app/services/settings-modal-window.service';
import { GlobalValuesService } from 'src/app/services/global-values.service';
import { CreateNewUserItemService } from 'src/app/services/create-new-user-item.service';
import { LeftMenuService } from 'src/app/services/left-menu.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from 'src/app/services/user.service';

interface MenuItem {
  name: string;
  icon: string;
  funcName?: string;
}

interface CheckboxItem {
  label: string;
  checked: boolean;
  id: string;
}

@Component({
  selector: 'app-settingswindow',
  templateUrl: './settingswindow.component.html',
  styleUrls: ['./settingswindow.component.css']
})
export class SettingswindowComponent {

  id: string = '';

  showMessage: boolean = false;
  message: string = '';

  constructor (private HeaderService: HeaderService, private SettingsModalWindowService: SettingsModalWindowService,
    private router: Router, private GlobalValuesService: GlobalValuesService, private LeftMenuService: LeftMenuService,
    private CreateNewUserItemService: CreateNewUserItemService, private http: HttpClient, private UserService: UserService
  ) {
    this.duplicate = this.duplicate.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.copyLink = this.copyLink.bind(this);
  }

  menuItemsUpper: MenuItem[] = [
    { name: 'Copy link', icon: "assets/icons/attach_file.svg", funcName: "copyLink"},
    { name: 'Duplicate', icon: "assets/icons/attach_file.svg", funcName: "duplicate"},
    { name: 'Delete', icon: "assets/icons/attach_file.svg", funcName: 'deleteItem'},
  ];


  checkboxes: CheckboxItem[] = [
    { label: 'Small text', checked: false, id: "smallText" },
    { label: 'Lock page', checked: false, id: "lockPage" },
    { label: 'Full width', checked: false, id: "fullWidth" }
  ];

  lastEditedDate: Date = new Date();
  lastEditedBy: string = "Kurt Cobain";

  isSettingsWindowVisible(): boolean
  {
    return this.HeaderService.settingsWindowVisible;
  }

  onCheckboxChange(checkbox: CheckboxItem) {
    console.log('Checkbox value:', checkbox.checked);
    if (checkbox.id === 'fullWidth') {
      this.SettingsModalWindowService.fullWidth = !this.SettingsModalWindowService.fullWidth;
    }
  }

  duplicate() {
    const url = this.router.url;
    const segments = url.split('/');
    this.id = segments[segments.length - 1]; // Assuming ID is the last segment
    if (this.GlobalValuesService.isValidUUID(this.id))
      {
        const baseSegments = segments.slice(0, segments.length - 1);
        // Generate new UUID
        const newUUID = this.GlobalValuesService.generateUUID();
        // Join base segments with new UUID
        const newId = baseSegments.join('/') + '/' + newUUID;
        console.log(newId);     
        this.CreateNewUserItemService.createNewMenuItem(this.id + ' (copy)', newUUID, newId, '');

        const headers = new HttpHeaders({
          'Authorization': `Bearer ${this.UserService.userToken}`,
        });
  
        const requestBody = { 
          noteId: this.id,
          newId: newUUID,
          newCurrentLink: newId
        };

        // this.http.post<any>(this.GlobalValuesService.api + 'Values/getPage', requestBody, {headers})
        // .subscribe(response => {
        //   console.log('Response:', response);

        // }, error => {
        //   console.error('Error:', error);
        // });
        
      }
  }

  deleteItem()
  {
    const url = this.router.url;
    const segments = url.split('/');
    this.id = segments[segments.length - 1]; // Assuming ID is the last segment
    if (this.GlobalValuesService.isValidUUID(this.id))
      {
        this.LeftMenuService.deleteItemById(this.id);
      }
  }

  copyLink()
  {
    const url = this.router.url;
    const segments = url.split('/');
    this.id = segments[segments.length - 1]; // Assuming ID is the last segment
    if (this.GlobalValuesService.isValidUUID(this.id))
      {
        navigator.clipboard.writeText(window.location.href).then(() => {
          this.message = 'copied';
        this.showMessage = true;
        setTimeout(() => {
          this.showMessage = false;
        }, 3000);
        }).catch(err => {
          console.error('Ошибка при копировании URL: ', err);
        });
      }
  }

  [key: string]: any; // Index signature
  callFunction(item: any) {
    const func = this[item.funcName];
    if (typeof func === 'function') {
      func(); // This calls the function dynamically
    } 
    else {
      console.error(`${item.funcName} is not a function.`);
    }
  }
}
