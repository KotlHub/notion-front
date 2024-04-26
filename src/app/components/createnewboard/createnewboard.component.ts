import { Component, OnDestroy } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDropListGroup,
} from '@angular/cdk/drag-drop';
import { BigModalWindowService } from 'src/app/services/big-modal-window.service';
import { EditCardListService } from 'src/app/services/edit-card-list.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from 'src/app/services/user.service';
import { GlobalValuesService } from 'src/app/services/global-values.service';

interface Card {
  id: string;
  name: string;
  description?: string;
  datetime?: Date;
  files?: string[];
}

interface List {
  id: string;
  name: string;
  cards: Card[];
}

@Component({
  selector: 'app-createnewboard',
  templateUrl: './createnewboard.component.html',
  styleUrls: ['./createnewboard.component.css'],
})
export class CreatenewboardComponent implements OnDestroy {
  id: string = '';
  lists: List[] = [];
  headerInput: string = '';
  newListName: string = '';
  newListVisible: boolean = true;
  originalCardText: string = '';
  selectedFiles: File[] = []; // Список файлов, которые нужно отправить

  constructor(
    private GlobalValuesService: GlobalValuesService,
    private UserService: UserService,
    private editCardListService: EditCardListService,
    private BigModalWindowService: BigModalWindowService,
    private http: HttpClient
  ) {
    this.editCardListService.descriptionSubject.subscribe((description) => {
      const cardToUpdate = this.findCardById(
        this.editCardListService.currentItemId
      );
      if (cardToUpdate) {
        cardToUpdate.description = description;
      }
    });
    this.id = new Date().toString();
  }

  toggleNewList() {
    this.newListVisible = !this.newListVisible;
  }

  createList() {
    if (!this.newListName.trim()) {
      let counter = 1;
      let newName = `Untitled${counter}`;

      while (this.lists.some((list) => list.name === newName)) {
        counter++;
        newName = `Untitled${counter}`;
      }

      this.newListName = newName;
    } else {
      const existingList = this.lists.find(
        (list) => list.name === this.newListName
      );

      if (existingList) {
        let counter = 1;
        let newName = `${this.newListName}${counter}`;

        while (this.lists.some((list) => list.name === newName)) {
          counter++;
          newName = `${this.newListName}${counter}`;
        }
        this.newListName = newName;
      }
    }

    const newList: List = {
      name: this.newListName,
      id: Date.now().toString(),
      cards: [],
    };

    this.lists.push(newList);

    this.newListName = '';
    console.log(this.lists);
  }

  addCard(list: List) {
    const newCard: Card = {
      id: Date.now().toString(),
      name: 'New Card',
    };
    list.cards.push(newCard);
  }

  onCardNameBlur(event: FocusEvent, card: Card) {
    const newValue = (event.target as HTMLDivElement).innerText;
    card.name = newValue;
  }

  onHeaderBlur() {
    console.log(this.headerInput);
  }

  onDrop(event: CdkDragDrop<Card[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
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
    newList.cards = newList.cards.map((card) => ({ ...card }));
    this.lists.push(newList);
  }

  deleteList(list: List) {
    const index = this.lists.findIndex((item) => item.id === list.id);
    if (index !== -1) {
      this.lists.splice(index, 1);
    }
  }

  toggleCard(card: any) {
    // this.editCardBoardService.currentCardId = card.id;
    // this.editCardBoardService.currentCardDescription = card.description || "";
    // this.editCardBoardService.editCardBoardVisible = !this.editCardBoardService.editCardBoardVisible;
    // this.BigModalWindowService.modalVisible = this.editCardBoardService.editCardBoardVisible;

    /////////

    this.editCardListService.currentItemId = card.id;
    this.editCardListService.currentItemDescription = card.description || '';
    console.log(
      'current description',
      this.editCardListService.currentItemDescription
    );
    this.editCardListService.editCardListVisible =
      !this.editCardListService.editCardListVisible;
    this.BigModalWindowService.modalVisible =
      this.editCardListService.editCardListVisible;
  }

  private findCardById(id: string): Card | undefined {
    for (const list of this.lists) {
      const card = list.cards.find((c) => c.id === id);
      if (card) {
        return card;
      }
    }
    return undefined;
  }

  // Обработка выбора файлов
  onFilesSelected(event: any) {
    const files = event.target.files; // Получаем список выбранных файлов
    if (files && files.length > 0) {
      this.selectedFiles = Array.from(files); // Преобразуем в массив
    }
  }

  // Метод, который вызывается при завершении работы компонента
  ngOnDestroy() {
    this.onClose();
  }

  onClose() {
    const board = {
      email: this.UserService.userEmail,
      noteId: this.id,
      title: this.headerInput,
      lists: this.lists,
    };

    const formData = new FormData();

    // Добавляем JSON-данные
    formData.append('board', JSON.stringify(board)); // Сериализуем объект в JSON

    // Добавляем все выбранные файлы
    this.selectedFiles.forEach((file, index) => {
      formData.append(`file_${index}`, file, file.name); // Добавляем файлы с уникальными ключами
    });

    const headers = new HttpHeaders({
      'token': this.UserService.userToken
    });

    // Отправка запроса на бэкенд
    this.http
      .post(this.GlobalValuesService.api + 'Values/sendPage', formData, {headers})
      .subscribe(
        (response) => {
          console.log('Response:', response); // Успешный ответ
        },
        (error) => {
          console.error('Error:', error); // Обработка ошибок
        }
      );
  }
}
