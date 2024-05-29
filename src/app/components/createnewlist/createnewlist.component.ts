import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { EditCardListService } from 'src/app/services/edit-card-list.service';
import { BigModalWindowService } from 'src/app/services/big-modal-window.service';
import { NewPageService } from 'src/app/services/new-page.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Location } from '@angular/common';
import { GlobalValuesService } from 'src/app/services/global-values.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MenuItem } from 'src/app/interfaces/menu-item';
import { LeftMenuService } from 'src/app/services/left-menu.service';
import { Subscription } from 'rxjs';

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

  currentId: string | null = null;
  previousId: string | null = null;

  paramMapSubscription: Subscription | undefined;

  constructor(private editCardListService: EditCardListService, private BigModalWindowService: BigModalWindowService, 
    private newPageService: NewPageService, private route: ActivatedRoute, private UserService: UserService, 
    private GlobalValuesService: GlobalValuesService, private LeftMenuService: LeftMenuService,
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

    this.paramMapSubscription = this.route.params.subscribe((params) => {
      this.previousId = this.currentId; // Сохраняем текущее значение как предыдущее
      this.currentId = params['id']; // Обновляем текущий ID

      if (this.previousId !== this.currentId) {
        this.onIdChange(this.previousId, this.currentId); // Вызываем функцию при изменении ID
      }
    });
    this.headerInput = '';
    this.lists = [];
    this.subscribeToGetParams();
    //this.createNewMenuItem();
    this.newPageService.justCreated = false;
  }

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    this.sendList();
    $event.returnValue = true;
  }

  // createNewMenuItem() {
  //   console.log("create new menu");
  //   let title = this.headerInput;
  //   if(title === '')
  //     {
  //       title = 'Untitled';
  //     }
  //   const newItem: MenuItem = {
  //     id: this.id,
  //     name: title,
  //     currentLink: this.currentLink,
  //     icon: "assets/icons/left_menu/format_list_bulleted.svg"
  //   };
    
  //   this.LeftMenuService.addMenuItem(newItem);
  // }

  onIdChange(previous: string | null, current: string | null) {
    console.log(this.id);
    console.log('lists: ', this.lists);
    console.log('header: ', this.headerInput);
    this.sendList();
    console.log('ID изменился. Предыдущий:', previous, 'Новый:', current);
    this.lists = [];
    this.headerInput = '';
    // Выполняем действия, когда ID меняется
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
    this.sendList();
  }

  sendList() {
    let title = this.headerInput;
    if(title === '')
      {
        title = 'Untitled';
    }

    this.LeftMenuService.updateMenuItem(this.id, title);
    const list = {
      email: this.UserService.userEmail,
      noteId: this.id,
      title: title,
      lists: this.lists,
      currentLink: this.currentLink,
      iconPath: "assets/icons/left_menu/format_list_bulleted.svg"
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

  private subscribeToGetParams(): void {
    
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id') || '';
      console.log(this.id);

      if(this.newPageService.newPageName.trim().length > 0)
        {
          this.headerInput = this.newPageService.newPageName;
          
        }
      
      console.log(this.headerInput);

      this.currentLink = this.location.path();
      
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${this.UserService.userToken}`,
      });

      const requestBody = { 
        email: this.UserService.userEmail,
        noteId: this.id,
      };
      //if(!this.newPageService.justCreated)
        //{
          console.log('get list');
        this.http.post<any>(this.GlobalValuesService.api + 'Values/getPage', requestBody, {headers})
        .subscribe(response => {
          console.log('Response:', response);

          if (response && response.lists && Array.isArray(response.lists)) {
            this.lists = response.lists.map((listData: any) => {
              return {
                id: listData.id,
                name: listData.name
              };
            });
            this.headerInput = response.title;
          }
        }, error => {
          console.error('Error:', error);
        });
       // }

      });
    }
}
