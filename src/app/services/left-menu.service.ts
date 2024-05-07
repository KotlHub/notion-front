import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MenuItem } from '../interfaces/menu-item';
import { GlobalValuesService } from './global-values.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from './user.service';
@Injectable({
  providedIn: 'root'
})
export class LeftMenuService {
  constructor(private GlobalValuesService: GlobalValuesService, private http: HttpClient, private UserService: UserService){}
  
  leftMenuWidth: number = 0;

  menuItemsMid: BehaviorSubject<MenuItem[]> = new BehaviorSubject<MenuItem[]>([
    { name: 'Quick Note', icon: "assets/icons/left_menu/attach_file.svg", id: '1'},
    { name: 'Personal Home', icon: "assets/icons/left_menu/location_home.svg", submenu: ['Element 1', 'Element 2', 'Element 3'] , id: '2'},
    { name: 'Task list', icon: "assets/icons/left_menu/check.svg", submenu: ['write html', 'write css', 'pet the cat'], id: '3' }
  ]);

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


  deleteItem(item: MenuItem) {
    const currentItems = this.menuItemsMid.getValue();
    const index = currentItems.findIndex(menuItem => menuItem === item);
    if (index !== -1) {
      currentItems.splice(index, 1);
      this.menuItemsMid.next(currentItems);
    }

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
  
}
