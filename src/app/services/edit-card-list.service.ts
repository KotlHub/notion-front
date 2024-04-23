import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditCardListService {
  editCardListVisible: boolean = false;
  descriptionSubject = new BehaviorSubject<string>('');
  currentListId: string = '';
  currentListDescription: string = '';

  constructor() { }
  
  setDescription(description: string) {
    this.descriptionSubject.next(description);
  }
}
