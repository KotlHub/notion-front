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
  cards: Card[];
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

    // Push the new card to the cards array of the specified list
    list.cards.push(newCard);

    console.log(newCard);
    console.log(this.lists);
    
  }

  onCardNameBlur(event: FocusEvent, card: Card) {
    const newValue = (event.target as HTMLDivElement).innerText;
    card.name = newValue;
  }
  

  onDragStart(event: DragEvent, card: Card, list: List) {
    event.dataTransfer?.setData('card', JSON.stringify(card));
    event.dataTransfer?.setData('listId', list.id || '');
  }
  
  onDragOver(event: DragEvent) {
    event.preventDefault();
  }
  
  onDrop(event: DragEvent, newList: List) {
    event.preventDefault();
    const cardData = event.dataTransfer?.getData('card');
    const listId = event.dataTransfer?.getData('listId');
  
    if (cardData) {
      const card: Card = JSON.parse(cardData);
      const sourceListIndex = this.lists.findIndex(list => list.id === listId);
  
      if (sourceListIndex !== -1) {
        const sourceList = this.lists[sourceListIndex];
        const targetIndex = this.getNewIndex(event, newList);
  
        // Remove card from source list
        sourceList.cards = sourceList.cards.filter(c => c.id !== card.id);
  
        // Insert card into the new list at the target index
        newList.cards.splice(targetIndex, 0, card);
      }
    }
  }
  
  getNewIndex(event: DragEvent, targetList: List): number {
    const targetElement = event.target as HTMLElement;
    const targetCardElement = targetElement.closest('.card');
  
    if (targetCardElement) {
      const cardId = targetCardElement.getAttribute('.card');
      const cardIndex = targetList.cards.findIndex(card => card.id === cardId);
      
      if (cardIndex !== -1) {
        return cardIndex;
      }
    }
  
    // If the card was dropped outside of existing cards, add it to the end
    return targetList.cards.length;
  }

  toggleDropdown(buttonId: string) {
    const dropdown = document.getElementById(buttonId);
    if (dropdown?.classList.contains('show')) {
      dropdown?.classList.remove('show');
    } else {
      dropdown?.classList.add('show');
    }
  }
  

  copyList(list: List) {
    const newList: List = { ...list };
    newList.id = Date.now().toString(); 
    newList.name = newList.name + ' (copy)'
    this.lists.push(newList);
  }
  
  deleteList(list: List) {
    const index = this.lists.findIndex(item => item.id === list.id);
    if (index !== -1) {
      this.lists.splice(index, 1);
    }
  }

}
