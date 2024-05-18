import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NewPageService } from 'src/app/services/new-page.service';
import { GlobalValuesService } from 'src/app/services/global-values.service'; 
import { UserService } from 'src/app/services/user.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { LeftMenuService } from 'src/app/services/left-menu.service';
import { CreateNewUserItemService } from 'src/app/services/create-new-user-item.service';
import { Location } from '@angular/common';

interface Card {
  [cardKey: string]: any;
  name: string;
  id: string;
  file: File | null; // Заменяем string на File
  description: string;
  imageUrl?: string;
}

export interface GalleryDTO {
  [key: string]: any;
  email: string;
  noteId: string;
  title: string;
  iconPath: string;
  currentLink: string;
  content: Card[];
}

@Component({
  selector: 'app-createnewgallery',
  templateUrl: './createnewgallery.component.html',
  styleUrls: ['./createnewgallery.component.css']
})
export class CreatenewgalleryComponent implements OnInit, OnDestroy {
  gallery: Card[] = [];
  headerInput: string = "";

  id: string = "";

  selectedFiles: File[] = []; // Список файлов, которые нужно отправить
  currentLink: string = "";


  currentId: string | null = null;
  previousId: string | null = null;
  paramMapSubscription: Subscription | undefined;

  constructor(
    private newPageService: NewPageService,
    private GlobalValuesService: GlobalValuesService,
    private UserService: UserService,
    private LeftMenuService: LeftMenuService,
    private CreateNewUserItemService: CreateNewUserItemService,
    private http: HttpClient,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router
  ) {
    
  }

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    this.sendGallery();
    $event.returnValue = true;
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
    this.gallery = [];
    this.subscribeToGetParams();
  
  }

  onIdChange(previous: string | null, current: string | null) {
    console.log('header: ', this.headerInput);
    this.sendGallery();
    console.log('ID изменился. Предыдущий:', previous, 'Новый:', current);
    this.gallery = [];
    this.headerInput = '';
    // Выполняем действия, когда ID меняется
  }


  createCard(event: any) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file = fileList[0];
      const newCard: Card = {
        name: "Card_name",
        id: Date.now().toString(),
        description: "",
        file: file
      }
      this.gallery.push(newCard);
    }
    event.target.value = null;
  }

  onCardNameBlur(event: FocusEvent, card: Card) {
    const newValue = (event.target as HTMLInputElement).value;
    card.name = newValue;
  }

  onHeaderBlur() {
    console.log(this.headerInput);
  }


  getImageUrl(card: Card): string | null {
  if (card.file) {
    // Проверяем, был ли URL-адрес уже кэширован
    if (card.imageUrl) {
      return card.imageUrl;
    } else {
      const reader = new FileReader();
      reader.onload = () => {
        // Кэшируем URL-адрес изображения
        card.imageUrl = reader.result as string;
      };
      reader.readAsDataURL(card.file);
    }
  }
  return card.imageUrl ?? null;
  }


  ngOnDestroy() {
    console.log("destructor");
    this.sendGallery();

  }

  sendGallery() {
    let title = this.headerInput;
    if(title === '')
      {
        title = 'Untitled';
    }
    this.LeftMenuService.updateMenuItem(this.id, title);
    const gallery: GalleryDTO = {
      email: this.UserService.userEmail,
      noteId: this.id,
      title: title,
      content: this.gallery,
      currentLink: this.currentLink,
      iconPath: "assets/icons/left_menu/gallery_thumbnail.svg"
    };

    console.log(gallery);

    this.CreateNewUserItemService.sendGallery(gallery, 'gallery', 'Values/sendGallery');
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
        this.http.post<any>(this.GlobalValuesService.api + 'Values/getGallery', requestBody, {headers})
        .subscribe(response => {
          console.log('Response:', response);

            this.gallery = response.lists.map((galleryData: any) => {
              const cards: Card[] = galleryData.cards.map((cardData: any) => ({
                id: cardData.id,
                name: cardData.name,
                description: cardData.description,
                datetime: cardData.datetime ? new Date(cardData.datetime) : undefined,
                files: cardData.files ? [...cardData.files] : undefined
              }));
    
              return {
                id: galleryData.id,
                name: galleryData.name,
                cards: cards
              };
            });
            this.headerInput = response.title;
          
        }, error => {
          console.error('Error:', error);
        });
        //}

      });
    }

}
