import { Component, OnInit } from '@angular/core';
import { LeftmenuComponent } from './components/leftmenu/leftmenu.component';
import { Router } from '@angular/router';
import { SettingsModalWindowService } from './services/settings-modal-window.service';
import { UserService } from './services/user.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'notion-front';
  menuVisible: boolean = false;
  userWallpaper: string = "";

  imageUrls: string[] = [];
  constructor(private UserService: UserService, private SettingsModalWindowService: SettingsModalWindowService, private http: HttpClient) {

  }
  ngOnInit(): void {
    this.http.get<string[]>('assets/wallpapers/wallpaperCollection.json').subscribe(data => {
      this.imageUrls = data;
    });
    console.log(this.imageUrls);
  }
  wallpaper: string = this.UserService.userWallpaper;

  
  changeWallpaper(image: string)
  {
    this.UserService.userWallpaper = image;
    this.wallpaper = this.UserService.userWallpaper;
  }

  isFullWidth(): boolean {
    return this.SettingsModalWindowService.fullWidth;
  }
  
}
