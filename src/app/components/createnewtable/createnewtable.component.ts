import { AfterViewInit, Component, HostListener, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { CreateNewUserItemService } from 'src/app/services/create-new-user-item.service';
import { NewPageService } from 'src/app/services/new-page.service';
import { GlobalValuesService } from 'src/app/services/global-values.service';
import { UserService } from 'src/app/services/user.service';
import { EditCardListService } from 'src/app/services/edit-card-list.service';
import { LeftMenuService } from 'src/app/services/left-menu.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Location } from '@angular/common';
import { ElementRef } from '@angular/core';

@Component({
  selector: 'app-createnewtable',
  templateUrl: './createnewtable.component.html',
  styleUrl: './createnewtable.component.css'
})
export class CreatenewtableComponent implements OnInit, OnDestroy{

  tableData: (string | null)[][] = [];

  tableDefault: (string | null)[][] = [
    ['Name', 'Number', 'Text'],
    [null, null, null],
    [null, null, null]
  ];

  id: string = '';
  headerInput: string = 'Untitled';
  currentLink: string = "";
  icon: string = "assets/icons/left_menu/table.svg";

  currentId: string | null = null;
  previousId: string | null = null;


  paramMapSubscription: Subscription | undefined;

  constructor (
    private newPageService: NewPageService,
    private GlobalValuesService: GlobalValuesService,
    private UserService: UserService,
    private editCardListService: EditCardListService,
    private LeftMenuService: LeftMenuService,
    private CreateNewUserItemService: CreateNewUserItemService,
    private http: HttpClient,
    private route: ActivatedRoute,
    private location: Location,
    private elementRef: ElementRef
  ) {}



  ngOnInit(): void {
    
    this.paramMapSubscription = this.route.params.subscribe((params) => {
      this.previousId = this.currentId; // Сохраняем текущее значение как предыдущее
      this.currentId = params['id']; // Обновляем текущий ID

      if (this.previousId !== this.currentId) {
        this.onIdChange(this.previousId, this.currentId); // Вызываем функцию при изменении ID
      }
    });
    this.headerInput = '';
    this.tableData = this.tableDefault;
    this.subscribeToGetParams();
    //this.CreateNewUserItemService.createNewMenuItem(this.headerInput, this.id, this.currentLink, this.icon)
    this.newPageService.justCreated = false;
  }
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    this.sendTable();
    $event.returnValue = true;
  }

  onIdChange(previous: string | null, current: string | null) {
    console.log('table: ', this.tableData);
    this.sendTable();
    console.log('ID изменился. Предыдущий:', previous, 'Новый:', current);
    this.tableData = this.tableDefault;
    this.headerInput = '';
    // Выполняем действия, когда ID меняется
  }

  addRow() {
    this.tableData.push(Array(this.tableData[0].length).fill(null));
  }

  addColumn() {
    this.tableData.forEach(row => row.push(null));
  }

  collectTableData() {
    const tableRows = document.querySelectorAll('.table-container table tr');
    this.tableData = [];
  
    tableRows.forEach(row => {
    const rowData: (string | null)[] = [];
    const cells = row.querySelectorAll('.table-cell');
    
    cells.forEach(cell => {
      const contentElement = cell.querySelector('.table-content');
      const content = contentElement?.textContent?.trim() ?? '';
      rowData.push(content);
    });
    
    this.tableData.push(rowData);
  });

  console.log(this.tableData);
  }

  ngOnDestroy(): void {
    console.log("table destructor");
    //this.collectTableData();
    this.sendTable();
  }

  sendTable() {
    //this.collectTableData();
    let title = this.headerInput;
    if(title === '')
      {
        title = 'Untitled';
    }
    this.LeftMenuService.updateMenuItem(this.id, title);
    const table = {
      email: this.UserService.userEmail,
      noteId: this.id,
      title: title,
      tableData: this.tableData,
      currentLink: this.currentLink,
      iconPath: "assets/icons/left_menu/table.svg"
    };

    console.log(table);

    this.CreateNewUserItemService.sendPage(table, 'table', 'Values/sendTable');
  }

  private subscribeToGetParams(): void {
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
        this.http.post<any>(this.GlobalValuesService.api + 'Values/getPage', requestBody, {headers})
        .subscribe(response => {
          console.log('Response:', response);

          if (response && response.tableData) {
            this.tableData = response.tableData;
            this.headerInput = response.title;
          }
          else
          {
            this.tableData = this.tableDefault;
          }
        }, error => {
          console.error('Error:', error);
          this.tableData = this.tableDefault;
        });
       // }

      });
    }
}
