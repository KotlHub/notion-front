import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';

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

  onListNameBlur(event: FocusEvent, list: List) {
    const newValue = (event.target as HTMLInputElement).value;
    list.name = newValue;
  }

  onHeaderBlur() {
    console.log(this.headerInput);
  }
}
