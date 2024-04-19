import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDropListGroup } from '@angular/cdk/drag-drop';
import { EditCardBoardService } from 'src/app/services/edit-card-board.service';
import { BigModalWindowService } from 'src/app/services/big-modal-window.service';

interface Card {
  id?: string;
  name: string;
  description?: string;
  datetime?: Date;
  files?: string[]; 
}

interface List {
  id?: string;
  name: string;
  cards: Card[];
}

@Component({
  selector: 'app-createnewboard',
  templateUrl: './createnewboard.component.html',
  styleUrls: ['./createnewboard.component.css']
})
export class CreatenewboardComponent {
  lists: List[] = [];
  headerInput: string = "";
  newListName: string = "";
  newListVisible: boolean = true;
  originalCardText: string = "";
  constructor(private editCardBoardService: EditCardBoardService, private BigModalWindowService: BigModalWindowService) { }

  toggleNewList() {
    this.newListVisible = !this.newListVisible;
    console.log(this.newListVisible);
  }

  createList() {
    if (!this.newListName.trim()) {
      let counter = 1;
      let newName = `Untitled${counter}`;
  
      while (this.lists.some(list => list.name === newName)) {
        counter++;
        newName = `Untitled${counter}`;
      }
      
      this.newListName = newName;
    } else {
      const existingList = this.lists.find(list => list.name === this.newListName);
  
      if (existingList) {
        let counter = 1;
        let newName = `${this.newListName}${counter}`;
  
        while (this.lists.some(list => list.name === newName)) {
          counter++;
          newName = `${this.newListName}${counter}`;
        }
        this.newListName = newName;
      }
    }
  
    const newList: List = {
      name: this.newListName,
      id: Date.now().toString(),
      cards: []
    };
    
    this.lists.push(newList);

    this.newListName = '';
  }

  addCard(list: List) {
    const newCard: Card = {
      id: Date.now().toString(),
      name: 'New Card'
    };
    list.cards.push(newCard);
  }

  onCardNameBlur(event: FocusEvent, card: Card) {
    const newValue = (event.target as HTMLDivElement).innerText;
    console.log(newValue);
    card.name = newValue;
  }
  

  onHeaderBlur() {
    console.log(this.headerInput);
  }

  onDrop(event: CdkDragDrop<Card[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
  

  copyList(list: List) {
    const newList: List = { ...list };
    newList.id = Date.now().toString(); 
    newList.name = newList.name + ' (copy)';
    newList.cards = newList.cards.map(card => ({...card}));
    this.lists.push(newList);
  }
  
  deleteList(list: List) {
    const index = this.lists.findIndex(item => item.id === list.id);
    if (index !== -1) {
      this.lists.splice(index, 1);
    }
  }

  toggleCard(){
    this.editCardBoardService.editCardBoardVisible = !this.editCardBoardService.editCardBoardVisible;
    this.BigModalWindowService.modalVisible = this.editCardBoardService.editCardBoardVisible;
  }
}
