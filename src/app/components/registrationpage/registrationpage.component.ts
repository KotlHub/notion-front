import { Component } from '@angular/core';

@Component({
  selector: 'app-registrationpage',
  templateUrl: './registrationpage.component.html',
  styleUrls: ['./registrationpage.component.css']
})
export class RegistrationpageComponent {
  extendedPage: boolean = false;
  email: string = '';
  emailValidationClass?: string;

  emailClick()
  {
    console.log("Email:", this.email);

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
  if (emailRegex.test(this.email)) {
    this.extendedPage = true;
    this.emailValidationClass = 'login-input-filled';
    this.extendedPage = true;
  } else {
    this.emailValidationClass = 'login-input-err';
  }
    
  }
}
