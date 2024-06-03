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

  movieUrls: string[] = [];
  spaceUrls: string[] = [];
  natureUrls: string[] = [];

  appliedStyles: { [key: string]: string } = {};
  constructor(private router: Router,private UserService: UserService, private SettingsModalWindowService: SettingsModalWindowService, private http: HttpClient) {

  }
  ngOnInit(): void {

    this.http.get<string[]>('assets/wallpapers/spaceCollection.json').subscribe(data => {
      this.spaceUrls = data;
    });

    this.http.get<string[]>('assets/wallpapers/movieCollection.json').subscribe(data => {
      this.movieUrls = data;
    });

    this.http.get<string[]>('assets/wallpapers/natureCollection.json').subscribe(data => {
      this.natureUrls = data;
    });
  }
  wallpaper: string = this.UserService.userWallpaper;

  fontStyles(): { [klass: string]: any } | null {
    const fontParameter = this.SettingsModalWindowService.font;
    if (!fontParameter) {
      return null;
    }
    const styleObject: { [klass: string]: any } = {};
    fontParameter.split(';').forEach(style => {
      const [key, value] = style.split(':');
      if (key && value) {
        styleObject[key.trim()] = value.trim();
      }
    });
    return styleObject;
  }
  changeWallpaper(image: string)
  {
    this.UserService.userWallpaper = image;
    this.wallpaper = this.UserService.userWallpaper;
  }

  isFullWidth(): boolean {
    return this.SettingsModalWindowService.fullWidth;
  }


  isWelcomeRoute(): boolean {
    return this.router.url === '/welcome';
  }

  isRegistrationRoute(): boolean {
    return this.router.url === '/registration';
  }

  isNotFoundRoute(): boolean {
    return this.router.url === '/404';
  }

  isMainRoute(): boolean {
    return !this.isWelcomeRoute() && !this.isRegistrationRoute() && !this.isNotFoundRoute();
  }


  
}
