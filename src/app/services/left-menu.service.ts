import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MenuItem } from '../interfaces/menu-item';

@Injectable({
  providedIn: 'root'
})
export class LeftMenuService {
  leftMenuWidth: number = 0;

  menuItemsMid: BehaviorSubject<MenuItem[]> = new BehaviorSubject<MenuItem[]>([
    { name: 'Quick Note', icon: "assets/icons/left_menu/attach_file.svg"},
    { name: 'Personal Home', icon: "assets/icons/left_menu/location_home.svg", submenu: ['Element 1', 'Element 2', 'Element 3'] },
    { name: 'Task list', icon: "assets/icons/left_menu/check.svg", submenu: ['write html', 'write css', 'pet the cat'] }
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
}
