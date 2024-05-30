import { Component, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDropListGroup,
} from '@angular/cdk/drag-drop';
import { BigModalWindowService } from 'src/app/services/big-modal-window.service';
import { EditCardListService, Property } from 'src/app/services/edit-card-list.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from 'src/app/services/user.service';
import { GlobalValuesService } from 'src/app/services/global-values.service';
import { ActivatedRoute, NavigationEnd, ParamMap, Router } from '@angular/router';
import { NewPageService } from 'src/app/services/new-page.service';
import { Location } from '@angular/common';
import { Subject, Subscription, filter, takeUntil } from 'rxjs';
import { MenuItem } from 'src/app/interfaces/menu-item';
import { LeftMenuService } from 'src/app/services/left-menu.service';
import { CreateNewUserItemService } from 'src/app/services/create-new-user-item.service';


interface Card {
  id: string;
  name: string;
  description?: string;
  datetime?: Date;
  files?: string[];
  properties?: Property[];
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
export class CreatenewboardComponent implements OnDestroy, OnInit{


  id: string = '';
  lists: List[] = [];
  headerInput: string = '';
  newListName: string = '';
  newListVisible: boolean = true;
  selectedFiles: File[] = []; // Список файлов, которые нужно отправить
  currentLink: string = "";


  currentId: string | null = null;
  previousId: string | null = null;

  currentList?: Card[] = [];

  propertyOptions: MenuItem[] = [
  ];

  paramMapSubscription: Subscription | undefined;


  constructor(
    private newPageService: NewPageService,
    private GlobalValuesService: GlobalValuesService,
    private UserService: UserService,
    private editCardListService: EditCardListService,
    private BigModalWindowService: BigModalWindowService,
    private LeftMenuService: LeftMenuService,
    private CreateNewUserItemService: CreateNewUserItemService,
    private http: HttpClient,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router
  ) {

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
    //this.CreateNewUserItemService.createNewMenuItem(this.headerInput, this.id, this.currentLink, this.icon)
    this.newPageService.justCreated = false;
    this.propertyOptions = this.editCardListService.propertyOptions;
  }

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    this.sendBoard();
    $event.returnValue = true;
  }

  onIdChange(previous: string | null, current: string | null) {
    console.log('lists: ', this.lists);
    console.log('header: ', this.headerInput);
    this.sendBoard();
    console.log('ID изменился. Предыдущий:', previous, 'Новый:', current);
    this.lists = [];
    this.headerInput = '';
    // Выполняем действия, когда ID меняется
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

  toggleCard(list: Card) {
    this.currentList = [list]; // Обновляем currentList, используя массив
    this.editCardListService.editCardListVisible = !this.editCardListService.editCardListVisible;
    this.BigModalWindowService.modalVisible = this.editCardListService.editCardListVisible;
  }

  selectProperty(option: MenuItem) {
    const newItem: Property = {
      name: option.name,
      description: "test",
      icon: option.icon
    };

    // Проверяем наличие currentList и инициализируем properties, если нужно
    if (this.currentList && this.currentList[0]) {
        if (!this.currentList[0].properties) {
            this.currentList[0].properties = [];
        }
        this.currentList[0].properties.push(newItem);
    }

    console.log(this.currentList);
}


  // Обработка выбора файлов
  onFilesSelected(event: any) {
    const files = event.target.files; // Получаем список выбранных файлов
    if (files && files.length > 0) {
      this.selectedFiles = Array.from(files); // Преобразуем в массив
    }
  }

  ngOnDestroy() {
    console.log("destructor");
    this.sendBoard();

  }

  isCardListVisible(): boolean {
    return this.editCardListService.editCardListVisible;
  }

  sendBoard() {
    let title = this.headerInput;
    if(title === '')
      {
        title = 'Untitled';
    }
    this.LeftMenuService.updateMenuItem(this.id, title);
    const board = {
      email: this.UserService.userEmail,
      noteId: this.id,
      title: title,
      lists: this.lists,
      currentLink: this.currentLink,
      iconPath: "assets/icons/left_menu/table_chart.svg"
    };

    this.CreateNewUserItemService.sendPage(board, 'board', 'Values/sendBoard', this.selectedFiles);
  }

  private subscribeToGetParams(): void {
    console.log('subscribe to params board')
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id') || '';
      console.log(this.id);

      if(this.newPageService.newPageName.trim().length > 0)
        {
          this.headerInput = this.newPageService.newPageName;
        }

        this.newPageService.newPageName = '';
      
      console.log(this.headerInput);

      this.currentLink = this.location.path();

      if(!this.LeftMenuService.itemExists(this.id))
        {
          this.CreateNewUserItemService.createNewMenuItem(this.headerInput, this.id, this.currentLink, 'icon');
        }

      const headers = new HttpHeaders({
        'Authorization': `Bearer ${this.UserService.userToken}`,
      });

      const requestBody = { 
        email: this.UserService.userEmail,
        noteId: this.id,
      };

      //if(!this.newPageService.justCreated)
        //{
          console.log('request to get page');
        this.http.post<any>(this.GlobalValuesService.api + 'Values/getPage', requestBody, {headers})
        .subscribe(response => {
          console.log('Response:', response);

          if (response && response.lists && Array.isArray(response.lists)) {
            this.lists = response.lists.map((listData: any) => {
              const cards: Card[] = listData.cards.map((cardData: any) => ({
                id: cardData.id,
                name: cardData.name,
                description: cardData.description,
                datetime: cardData.datetime ? new Date(cardData.datetime) : undefined,
                files: cardData.files ? [...cardData.files] : undefined
              }));
    
              return {
                id: listData.id,
                name: listData.name,
                cards: cards
              };
            });
            this.headerInput = response.title;
          }
        }, error => {
          console.error('Error:', error);
        });
        //}

      });
    }
  
}
