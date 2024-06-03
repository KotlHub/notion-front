import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ViewChild, ElementRef, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { EditCardListService } from 'src/app/services/edit-card-list.service';
import { NewPageService } from 'src/app/services/new-page.service';
import { UserService } from 'src/app/services/user.service';
import { GlobalValuesService } from 'src/app/services/global-values.service';
import { Location } from '@angular/common';
import { LeftMenuService } from 'src/app/services/left-menu.service';

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
    private LeftMenuService: LeftMenuService,
    private http: HttpClient,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  userEmail = this.UserSevice.userEmail;
  userToken = this.UserSevice.userToken;

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    this.sendPage();
    $event.returnValue = true;
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    console.log(this.id);
    this.headerInput = this.newPageService.newPageName;
    console.log(this.headerInput);
    this.currentLink = this.location.path();

    this.subscribeToGetParams();

    // Добавить код для установки initial mainText
    setTimeout(() => {
        this.contentEditable.nativeElement.innerHTML = this.mainText;
    });
}


  updateMainText(event: Event) {
    this.mainText = (event.target as HTMLElement).innerHTML;
  }

  onIdChange(previous: string | null, current: string | null) {
    this.sendPage();
    console.log('ID изменился. Предыдущий:', previous, 'Новый:', current);
    this.mainText = '';
    this.headerInput = '';
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
    this.sendPage();
  }

  sendPage() {
    let title = this.headerInput;
    if(title === '')
      {
        title = 'Untitled';
    }
    
    this.LeftMenuService.updateMenuItem(this.id, title);
    const page = {
      email: this.UserService.userEmail,
      noteId: this.id,
      title: title,
      mainText: this.mainText,
      currentLink: this.currentLink,
      iconPath: "assets/icons/left_menu/note_stack.svg"
    };

    console.log(page);

    const formData = new FormData();

    formData.append('page', JSON.stringify(page));

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.UserService.userToken}`
    });

    this.http
      .post(this.GlobalValuesService.api + 'Values/sendPage', formData, {headers})
      .subscribe(
        (response) => {
          console.log('Response:', response);
        },
        (error) => {
          console.error('Error:', error);
        }
      );
  }

  private subscribeToGetParams(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
        this.id = params.get('id') || '';
        console.log(this.id);

        if (this.newPageService.newPageName.trim().length > 0) {
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
        this.http.post<any>(this.GlobalValuesService.api + 'Values/getPage', requestBody, {headers})
            .subscribe(response => {
                console.log('Response:', response);

                if (response && response.mainText) {
                    this.mainText = response.mainText;
                    this.headerInput = response.title;

                    // Обновить contentEditable содержимым mainText
                    setTimeout(() => {
                        this.contentEditable.nativeElement.innerHTML = this.mainText;
                    });
                }
            }, error => {
                console.error('Error:', error);
            });
    });
}

}
