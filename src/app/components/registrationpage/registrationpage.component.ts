import { Component } from '@angular/core';

@Component({
  selector: 'app-registrationpage',
  templateUrl: './registrationpage.component.html',
  styleUrls: ['./registrationpage.component.css']
})
export class RegistrationpageComponent {
  extendedPage: boolean = false;

  emailClick()
  {
    this.extendedPage = true;
  }
}
