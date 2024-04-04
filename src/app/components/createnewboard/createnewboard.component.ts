import { Component } from '@angular/core';

interface Card {
  id?: string;
  name: string;
  description?: string;
  datetime?: Date;
  files?: string[]; // Массив строк для имен файлов или ссылок на файлы
}

interface List {
  id?: string;
  name: string;
  cards?: Card[];
}

@Component({
  selector: 'app-createnewboard',
  templateUrl: './createnewboard.component.html',
  styleUrls: ['./createnewboard.component.css']
})
export class CreatenewboardComponent {

  lists: List[] = [];
  newListName: string = "";
  newListVisible: boolean = true;

  toggleNewList()
  {
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

    } 

    else {
      const existingList = this.lists.find(list => list.name === this.newListName);
  
      // Если такой элемент уже существует
      if (existingList) {
        let counter = 1;
        let newName = `${this.newListName}${counter}`;
  
        // Генерируем новое уникальное имя, пока не найдем свободное
        while (this.lists.some(list => list.name === newName)) {
          counter++;
          newName = `${this.newListName}${counter}`;
        }
        // Используем новое уникальное имя
        this.newListName = newName;
      }
    }
  
  
    const newList: List = {
      name: this.newListName
    };
    
    this.lists.push(newList);

    this.newListName = '';
  }

}
