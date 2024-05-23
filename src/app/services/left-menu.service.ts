import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MenuItem } from '../interfaces/menu-item';
import { GlobalValuesService } from './global-values.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from './user.service';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class LeftMenuService {
  constructor(private GlobalValuesService: GlobalValuesService, private http: HttpClient, private UserService: UserService,
    private router: Router
  ){}
  
  leftMenuWidth: number = 0;

  menuItemsMid: BehaviorSubject<MenuItem[]> = new BehaviorSubject<MenuItem[]>([
    { name: 'Quick Note', icon: "assets/icons/left_menu/attach_file.svg", id: '1'},
    { name: 'Personal Home', icon: "assets/icons/left_menu/location_home.svg", id: '2'},
    { name: 'Task list', icon: "assets/icons/left_menu/check.svg", id: '3' }
  ]);

  trashItems: BehaviorSubject<MenuItem[]> = new BehaviorSubject<MenuItem[]>([
  ]);

  itemExists(id: string): boolean {
    const items = this.menuItemsMid.getValue();
    return items.some(item => item.id === id);
  }

  getMenu()
  {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.UserService.userToken}`,
    });

    const requestBody = { email: this.UserService.userEmail };

    console.log(requestBody);
    this.http.post<any>(this.GlobalValuesService.api + 'Values/getUserNotes', requestBody, {headers})
    .subscribe(response => {
      response.forEach((element: { name: any; iconPath: any; currentLink: any; id: any;}) => {
        const newItem: MenuItem = {
          name: element.name,
          icon: element.iconPath,
          currentLink: element.currentLink,
          id: element.id
        };
        this.addMenuItem(newItem);
      });
    }, error => {
      console.error('Error:', error);
    });
  }

  addMenuItem(item: MenuItem) {
    const currentItems = this.menuItemsMid.getValue();
    // Проверяем, существует ли элемент с таким id
    
    const existingIndex = currentItems.findIndex(existingItem => existingItem.id === item.id);
    if (existingIndex === -1) {
      currentItems.push(item);
      this.menuItemsMid.next(currentItems);
    }

  }

  updateMenuItem(id: string, newName: string) {
    const currentItems = this.menuItemsMid.getValue();
    const existingIndex = currentItems.findIndex(existingItem => existingItem.id === id);
    
    if (existingIndex !== -1) {
      currentItems[existingIndex].name = newName;
      this.menuItemsMid.next(currentItems);
    } else {
      console.error('Item not found');
    }
  }

  deleteItemById(id: string) {
    if (this.itemExists(id)) {
      const currentItems = this.menuItemsMid.getValue();
      const itemToDelete = currentItems.find(item => item.id === id);
      if (itemToDelete) {
        this.deleteItem(itemToDelete);
      }
    }
  }
  


  deleteItem(item: MenuItem) {
    const currentItems = this.menuItemsMid.getValue();
    const currentTrashItems = this.trashItems.getValue();
    const index = currentItems.findIndex(menuItem => menuItem === item);
    if (index !== -1) {
      currentItems.splice(index, 1);
      this.menuItemsMid.next(currentItems);

      currentTrashItems.push(item);
      this.trashItems.next(currentTrashItems);
    }

    console.log(this.trashItems);

    this.router.navigate(['']);

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.UserService.userToken}`,
    });

    const requestBody = {
       email: this.UserService.userEmail,
       noteId: item.id
      };

      console.log(item.id);

    console.log(requestBody);
    this.http.post<any>(this.GlobalValuesService.api + 'Values/delPage', requestBody, {headers})
    .subscribe(response => {
      console.log('Response:', response);
      
    }, error => {
      console.error('Error:', error);
    });


  }

  recoverItem(item: MenuItem)
  {
    const currentItems = this.menuItemsMid.getValue();
    const currentTrashItems = this.trashItems.getValue();
    const index = currentTrashItems.findIndex(menuItem => menuItem === item);
    if (index !== -1) {
      currentTrashItems.splice(index, 1);
      this.trashItems.next(currentTrashItems);

      currentItems.push(item);
      this.menuItemsMid.next(currentItems);
    }
  }
  
}
