import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MenuItem } from '../interfaces/menu-item';

export interface Property {
  id?: string;
  name: string;
  description: string;
  icon: string;
}

@Injectable({
  providedIn: 'root'
})
export class EditCardListService {
  constructor() { }

  editCardListVisible: boolean = false;
  
  propertyOptions: MenuItem[] = [
    { name: 'Date', icon: "assets/icons/edit_card_list/add.svg", id: "sortButton" },
    { name: 'Text', icon: "assets/icons/edit_card_list/adjust.svg", id: "titleOnlyButton" },
    { name: 'Number', icon: "assets/icons/edit_card_list/attach_file_add.svg", id: "createdByButton" },
    { name: 'Status', icon: "assets/icons/edit_card_list/calendar_month.svg", id: "inButton" },
    { name: 'Checkbox', icon: "assets/icons/edit_card_list/shoppingmode.svg", id: "dateButton" },
    { name: 'URL', icon: "assets/icons/search_page/swap_vert.svg", id: "dateButton" },
    { name: 'Email', icon: "assets/icons/search_page/swap_vert.svg", id: "dateButton" },
    { name: 'Phone', icon: "assets/icons/search_page/swap_vert.svg", id: "dateButton" },
  ];
}
