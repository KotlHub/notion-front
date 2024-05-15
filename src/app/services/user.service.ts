import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userToken: string = "";
  userEmail: string = "";
  userWallpaper: string = "assets/wallpapers/wallpaper1.png";
  constructor() {
    // Initialize userToken and userEmail from localStorage or use empty strings if not found
    this.userToken = localStorage.getItem('userToken') || '';
    this.userEmail = localStorage.getItem('userEmail') || '';
  }

  setUserToken(token: string) {
    this.userToken = (token);
    localStorage.setItem('userToken', token); // Save to localStorage
  }

  setUserEmail(email: string) {
    this.userEmail = (email);
    localStorage.setItem('userEmail', email); // Save to localStorage
  }
}
