import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { GlobalValuesService } from 'src/app/services/global-values.service';

interface TokenResponse {
  token: string;
  // Другие поля, если они также присутствуют в ответе
}

@Component({
  selector: 'app-registrationpage',
  templateUrl: './registrationpage.component.html',
  styleUrls: ['./registrationpage.component.css']
})
export class RegistrationpageComponent {
  extendedPage: boolean = false;
  email: string = '';
  emailCode: string = '';
  emailValidationClass?: string;



  constructor(private GlobalValuesService: GlobalValuesService, private http: HttpClient, private UserService: UserService, private router: Router) { }

  emailClick() {
    console.log("Email:", this.email);
  
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
    if (emailRegex.test(this.email)) {
      this.extendedPage = true;
      this.emailValidationClass = 'login-input-filled';
      this.extendedPage = true;
      this.sendEmail(this.email);
  
    } else {
      this.emailValidationClass = 'login-input-err';
    }
  }

  emailCodeClick()
  {
    console.log("emailCode:", this.emailCode);
    this.sendEmailCode(this.email, this.emailCode);
  }
  
  sendEmail(email: string) {

  this.http.post(this.GlobalValuesService.api + 'Values/login', { email: email })
  .subscribe(response => {
    console.log('Response:', response);
  }, error => {
    console.error('Error:', error);
  });
  }

  sendEmailCode(email: string, emailCode: string) {

    this.http.post<any>(this.GlobalValuesService.api + 'Values/authorize', {email: email, emailCode: emailCode})
    .subscribe(response => {
      console.log('Response:', response.token);
      this.UserService.setUserToken(response.token);
      this.UserService.setUserEmail(this.email);
      this.router.navigate(['/createnewpage/emptypage']);
    }, error => {
      console.error('Error:', error);
    });
  }
  

  
}
