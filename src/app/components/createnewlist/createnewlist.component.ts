import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { EditCardListService } from 'src/app/services/edit-card-list.service';
import { BigModalWindowService } from 'src/app/services/big-modal-window.service';

interface List {
  name: string;
  id: string;
}

@Component({
  selector: 'app-createnewlist',
  templateUrl: './createnewlist.component.html',
  styleUrl: './createnewlist.component.css'
})
export class CreatenewlistComponent {
  lists: List[] = [];
  newListName: string = "";
  headerInput: string = "";
  constructor(private editCardListService: EditCardListService, private BigModalWindowService: BigModalWindowService) { }

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
      id: Date.now().toString()
    };

    this.lists.push(newList);

    this.newListName = '';
  }

  onDrop(event: CdkDragDrop<List[]>) {
      moveItemInArray(this.lists, event.previousIndex, event.currentIndex);
    
  }


  onListNameBlur(event: FocusEvent, list: List) {
    const newValue = (event.target as HTMLInputElement).value;
    list.name = newValue;
  }

  onHeaderBlur() {
    console.log(this.headerInput);
  }

  toggleCard(){
    this.editCardListService.editCardListVisible = !this.editCardListService.editCardListVisible;
    this.BigModalWindowService.modalVisible = this.editCardListService.editCardListVisible;
  }
}
