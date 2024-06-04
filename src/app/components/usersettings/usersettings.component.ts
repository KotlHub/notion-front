import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-usersettings',
  templateUrl: './usersettings.component.html',
  styleUrl: './usersettings.component.css'
})
export class UsersettingsComponent implements OnInit{
  userName: string = '';
  userEmail: string = '';

  settingsToShow: number = 1;

  leftButtons: any = [
    { id: 1, name: 'My account', imageUrl: 'assets/icons/user_settings/account_circle.svg' },
    { id: 2, name: 'Appearance', imageUrl: 'assets/icons/user_settings/imagesearch_roller.svg' },
    { id: 3, name: 'Language & region', imageUrl: 'assets/icons/user_settings/language.svg' },
  ];
  constructor(private UserService: UserService) {

  }
  ngOnInit(): void {
    this.userName = this.UserService.userEmail;
    this.userEmail = this.UserService.userEmail;

    if (this.leftButtons && this.leftButtons.length > 0) {
      this.settingsToShow = this.leftButtons[0].id;
    } else {
      console.error('ideasButtons is undefined or empty');
    }
  }

  selectButton(id: number) {
    this.settingsToShow = id;
  }



  isUserSettingsVisible(): boolean {
    return this.UserService.userSettingsVisible;
  }
}
