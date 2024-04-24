import { Component, OnDestroy } from '@angular/core';
import { EditCardListService } from '../../services/edit-card-list.service';

@Component({
  selector: 'app-editcardlist',
  templateUrl: './editcardlist.component.html',
  styleUrls: ['./editcardlist.component.css']
})
export class EditcardlistComponent{
  
  constructor(private editCardListService: EditCardListService) { }
  description: string = "";
  currentDescription: string = "";
  
  isCardListVisible(): boolean {
    this.currentDescription = this.editCardListService.currentItemDescription;
    
    return this.editCardListService.editCardListVisible;
  }

  editCardList() {
    this.editCardListService.setDescription(this.description);
  }
}
