import { Component } from '@angular/core';
import { GlobalValuesService } from 'src/app/services/global-values.service';
import { CreateNewUserItemService } from 'src/app/services/create-new-user-item.service';
import { Router } from '@angular/router';
import { NewPageService } from 'src/app/services/new-page.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  headerInput: string = "";

  buttons: any = [
    { name: 'Board', imageUrl: 'assets/icons/left_menu/table_chart.svg', funcName: "board" },
    { name: 'List', imageUrl: 'assets/icons/left_menu/format_list_bulleted.svg', funcName: "list" },
    { name: 'Gallery', imageUrl: 'assets/icons/left_menu/gallery_thumbnail.svg', funcName: "gallery" },
    { name: 'Table', imageUrl: 'assets/icons/left_menu/table.svg', funcName: "table" },
    { name: 'Empty page', imageUrl: 'assets/icons/left_menu/note_stack.svg', funcName: "emptypage" }
  ];

  constructor(private GlobalValuesService: GlobalValuesService, private CreateNewUserItemService: CreateNewUserItemService,
    private router: Router, private newPageService: NewPageService
  ) {

  }


  createNewPage(page: string, imageUrl: string)
  {
    this.newPageService.newPageName = this.headerInput;
    const id = this.GlobalValuesService.generateUUID();
    this.router.navigate(['/createnewpage', page, id ]);
    const link = '/createnewpage/' + page + "/" + id;
    this.CreateNewUserItemService.createNewMenuItem(this.headerInput, id, link, imageUrl);


  }
}
