import { Component } from '@angular/core';

@Component({
  selector: 'app-authtokes',
  templateUrl: './authtokes.component.html',
  styleUrls: ['./authtokes.component.css']
})
export class AuthtokesComponent {
  id!: String
  userId!: String
  token!: String
  expDate!: Date
}
