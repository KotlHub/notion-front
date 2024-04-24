import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditCardBoardService {
  constructor() { }
  editCardBoardVisible: boolean = false;
  descriptionSubject = new BehaviorSubject<string>('');
  currentCardId: string = '';
  currentCardDescription: string = '';

 
  
  setDescription(description: string) {
    this.descriptionSubject.next(description);
  }
}
