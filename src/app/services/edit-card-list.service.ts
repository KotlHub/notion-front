import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditCardListService {
  constructor() { }
  editCardListVisible: boolean = false;
  descriptionSubject = new BehaviorSubject<string>('');
  currentItemId: string = '';
  currentItemDescription: string = '';

  
  
  setDescription(description: string) {
    this.descriptionSubject.next(description);
  }
}
