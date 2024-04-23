import { Component, OnDestroy } from '@angular/core';
import { EditCardListService } from '../../services/edit-card-list.service';

@Component({
  selector: 'app-editcardlist',
  templateUrl: './editcardlist.component.html',
  styleUrls: ['./editcardlist.component.css']
})
export class EditcardlistComponent{
  description: string = '';

  constructor(private editCardListService: EditCardListService) { }

  isCardListVisible(): boolean {
    return this.editCardListService.editCardListVisible;
  }

  editCardList() {
    this.editCardListService.setDescription(this.description);
  }
}
