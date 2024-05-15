import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
export interface Property {
  id: string;
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
  descriptionSubject = new BehaviorSubject<string>('');
  currentItemId: string = '';
  currentItemDescription: string = '';
  currentpropertyList: Property[] = [];
  
  
  setDescription(description: string) {
    this.descriptionSubject.next(description);
  }
}
