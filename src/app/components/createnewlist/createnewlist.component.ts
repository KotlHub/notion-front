import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { EditCardListService } from 'src/app/services/edit-card-list.service';
import { BigModalWindowService } from 'src/app/services/big-modal-window.service';
import { NewPageService } from 'src/app/services/new-page.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Location } from '@angular/common';
import { GlobalValuesService } from 'src/app/services/global-values.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

interface List {
  name: string;
  id: string;
  description?: string;
}

@Component({
  selector: 'app-createnewlist',
  templateUrl: './createnewlist.component.html',
  styleUrls: ['./createnewlist.component.css']
})
export class CreatenewlistComponent implements OnDestroy, OnInit {
  lists: List[] = [];
  newListName: string = "";
  headerInput: string = "";
  id: string = "";
  currentLink: string = "";
  selectedFiles: File[] = []; // Список файлов, которые нужно отправить

  constructor(private editCardListService: EditCardListService, private BigModalWindowService: BigModalWindowService, 
    private newPageService: NewPageService, private route: ActivatedRoute, private UserService: UserService, 
    private GlobalValuesService: GlobalValuesService,
    private location: Location, private http: HttpClient
  ) {
    this.editCardListService.descriptionSubject.subscribe(description => {
      if (this.lists.length > 0) {
        const index = this.lists.findIndex(list => list.id === this.editCardListService.currentItemId);
        if (index !== -1) {
          this.lists[index].description = description;
        }
      }
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    console.log(this.id);
    this.headerInput = this.newPageService.newPageName;
    console.log(this.headerInput);
    
    console.log(this.headerInput);
    this.currentLink = this.location.path();
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
      id: Date.now().toString()
    };

    this.lists.push(newList);

    this.newListName = '';
    console.log('lists: ', this.lists);
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

  toggleCard(list: List){
    this.editCardListService.currentItemId = list.id;
    this.editCardListService.currentItemDescription = list.description || "";
    console.log("current description", this.editCardListService.currentItemDescription);
    this.editCardListService.editCardListVisible = !this.editCardListService.editCardListVisible;
    this.BigModalWindowService.modalVisible = this.editCardListService.editCardListVisible;
  }  

  ngOnDestroy(): void {
    this.onClose()
    
  }

  onClose() {
    const list = {
      email: this.UserService.userEmail,
      noteId: this.id,
      title: this.headerInput,
      lists: this.lists,
      currentLink: this.currentLink
    };

    const formData = new FormData();

    // Добавляем JSON-данные
    formData.append('list', JSON.stringify(list)); // Сериализуем объект в JSON

    // Добавляем все выбранные файлы
    this.selectedFiles.forEach((file, index) => {
      formData.append(`file_${index}`, file, file.name); // Добавляем файлы с уникальными ключами
    });

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.UserService.userToken}`
    });

    // Отправка запроса на бэкенд
    this.http
      .post(this.GlobalValuesService.api + 'Values/sendList', formData, {headers})
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
