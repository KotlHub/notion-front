import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ViewChild, ElementRef, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EditCardListService } from 'src/app/services/edit-card-list.service';
import { NewPageService } from 'src/app/services/new-page.service';
import { UserService } from 'src/app/services/user.service';
import { GlobalValuesService } from 'src/app/services/global-values.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-createnewpage',
  templateUrl: './createnewpage.component.html',
  styleUrls: ['./createnewpage.component.css']
})
export class CreatenewpageComponent implements OnInit, OnDestroy {

  @ViewChild('contentEditable', { static: false }) contentEditable!: ElementRef;
  @ViewChild('buttonContainer', { static: false }) buttonContainer!: ElementRef;
  @ViewChild('linkContainer', { static: false }) linkContainer!: ElementRef;

  id: string = '';
  headerInput: string = '';
  mainText: string = "";
  currentLink: string = "";


  isLinkContainer: boolean = false;

  constructor(private UserSevice: UserService,
    private newPageService: NewPageService,
    private GlobalValuesService: GlobalValuesService,
    private UserService: UserService,
    private editCardListService: EditCardListService,
    private http: HttpClient,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  userEmail = this.UserSevice.userEmail;
  userToken = this.UserSevice.userToken;

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    console.log(this.id);
    this.headerInput = this.newPageService.newPageName;
    console.log(this.headerInput);
    this.currentLink = this.location.path();
  }

  makeFormat(event: MouseEvent, style: string) {
    event.stopPropagation();
    document.execCommand('styleWithCSS', false, 'true');
    document.execCommand(style, false, undefined);
    this.contentEditable.nativeElement.focus();
  }

  toggleLinkContainer() {
    this.isLinkContainer = !this.isLinkContainer;
  }

  confirmLink(event: MouseEvent) {
    let linkContainer = (event.target as HTMLElement).parentElement;
    while (linkContainer && !linkContainer.classList.contains('link-container')) {
        linkContainer = linkContainer.parentElement;
    }

    if (linkContainer) {
        const linkInput = linkContainer.querySelector('.link-input') as HTMLInputElement;
        const link = linkInput.value;
        const selection = window.getSelection();
        if (selection) {
            const range = selection.getRangeAt(0);
            const linkElement = document.createElement('a');
            linkElement.href = link;
            linkElement.textContent = range.toString();
            range.deleteContents();
            range.insertNode(linkElement);
        }
        this.toggleLinkContainer(); // Hide the link container after confirming link
    } else {
      console.error('linkContainer is undefined');
    }
  }

  cancelLink(event: MouseEvent) {
    this.toggleLinkContainer(); // Hide the link container after canceling link
  }



  @HostListener('mouseup', ['$event'])
  onMouseUp(event: MouseEvent) {
    const selection = window.getSelection();
    const target = event.target as HTMLElement;
    const buttonContainer = this.buttonContainer.nativeElement as HTMLElement;

    if (selection && selection.toString().length > 0 && !buttonContainer.contains(target)) {
      this.buttonContainer.nativeElement.style.display = 'block';
      this.buttonContainer.nativeElement.style.left = event.clientX + 'px';
      this.buttonContainer.nativeElement.style.top = event.clientY + 'px';
    } else if (selection?.toString().length === 0 && !buttonContainer.contains(target)) {
      this.buttonContainer.nativeElement.style.display = 'none';
    }
  }

  ngOnDestroy() {
    //this.onClose();
  }

  onClose() {
    const page = {
      email: this.UserService.userEmail,
      noteId: this.id,
      title: this.headerInput,
      
      currentLink: this.currentLink
    };

    const formData = new FormData();

    // Добавляем JSON-данные
    formData.append('page', JSON.stringify(page)); // Сериализуем объект в JSON

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.UserService.userToken}`
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
