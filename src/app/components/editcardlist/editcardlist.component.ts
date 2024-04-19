import { Component } from '@angular/core';
import { EditCardListService } from '../../services/edit-card-list.service';

@Component({
  selector: 'app-editcardlist',
  templateUrl: './editcardlist.component.html',
  styleUrl: './editcardlist.component.css'
})
export class EditcardlistComponent {
  constructor(private editCardListService: EditCardListService) { }

  isCardListVisible(): boolean {
    return this.editCardListService.editCardListVisible;
  }

  editCardList(item: any) {
  }
}
