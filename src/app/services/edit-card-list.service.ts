import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditCardListService {
  constructor() { }
  editCardListVisible: boolean = false;
  descriptionSubject = new BehaviorSubject<string>('');
  currentListId: string = '';
  currentListDescription: string = '';

  
  
  setDescription(description: string) {
    this.descriptionSubject.next(description);
  }
}
