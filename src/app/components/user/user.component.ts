import { Component } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  id!: String
  name!: String
  imgPath!: String
  email!: String
  isDeleted: boolean = false;

}
