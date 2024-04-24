import { Component } from '@angular/core';
import { EditCardBoardService } from '../../services/edit-card-board.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editcardboard',
  templateUrl: './editcardboard.component.html',
  styleUrl: './editcardboard.component.css'
})
export class EditcardboardComponent {
  constructor(private editCardBoardService: EditCardBoardService) { }
  description: string = "";
  currentDescription: string = "";
  
  isCardListVisible(): boolean {
    this.currentDescription = this.editCardBoardService.currentCardDescription;
    
    return this.editCardBoardService.editCardBoardVisible;
  }

  editCardList() {
    this.editCardBoardService.setDescription(this.description);
  }
  


  isCardBoardVisible(): boolean {
    return this.editCardBoardService.editCardBoardVisible;
  }
}
