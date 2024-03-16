import { Component } from '@angular/core';
import { NewPageService } from 'src/app/services/new-page.service';

@Component({
  selector: 'app-newpage',
  templateUrl: './newpage.component.html',
  styleUrls: ['./newpage.component.css']
})
export class NewpageComponent {

  constructor(private newPageService: NewPageService) { }
  newPageVisible!: boolean;

  isNewPageVisible(): boolean {
    return this.newPageService.newPageVisible;
  }
}
