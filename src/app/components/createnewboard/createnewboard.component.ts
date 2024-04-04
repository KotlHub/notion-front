import { Component } from '@angular/core';

interface Card {
  id: string;
  name: string;
  description?: string;
  datetime?: Date;
  files?: string[]; // Массив строк для имен файлов или ссылок на файлы
}

interface List {
  id: string;
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

  createList() 
  {
    const newList: List = {
      id: this.newListName || 'Untitled',
      name: this.newListName || 'Untitled' // Используем введенное значение или "Untitled", если поле ввода пустое
    };
    this.lists.push(newList);
    this.newListName = ''; // Очищаем значение после добавления списка

  }

}
