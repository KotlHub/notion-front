import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-registrationpage',
  templateUrl: './registrationpage.component.html',
  styleUrls: ['./registrationpage.component.css']
})
export class RegistrationpageComponent {
  extendedPage: boolean = false;
  email: string = '';
  emailValidationClass?: string;


  url = 'https://26.5.203.178:7091/api/Values/login';

  constructor(private http: HttpClient) { }

  emailClick() {
    console.log("Email:", this.email);
  
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
    if (emailRegex.test(this.email)) {
      this.extendedPage = true;
      this.emailValidationClass = 'login-input-filled';
      this.extendedPage = true;
      this.sendEmail(this.email).subscribe(response => {
        console.log('Response:', response);
      }, error => {
        console.error('Error:', error);
      });
  
    } else {
      this.emailValidationClass = 'login-input-err';
    }
  }
  
  sendEmail(email: string) {
    console.log("send email", email);
    return this.http.post(this.url, { email });
  }
  

  
}
