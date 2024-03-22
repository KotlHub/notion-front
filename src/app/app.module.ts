import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { UserComponent } from './components/user/user.component';
import { NotesComponent } from './components/notes/notes.component';
import { TeamspacesComponent } from './components/teamspaces/teamspaces.component';
import { UserteamspacesComponent } from './components/userteamspaces/userteamspaces.component';
import { AuthtokesComponent } from './components/authtokes/authtokes.component';
import { LeftmenuComponent } from './components/leftmenu/leftmenu.component';
import { HeaderComponent } from './components/header/header.component';
import { LeftMenuService } from './services/left-menu.service';
import { RegistrationpageComponent } from './components/registrationpage/registrationpage.component';
import { NewpageComponent } from './components/newpage/newpage.component';
import { SettingswindowComponent } from './components/settingswindow/settingswindow.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    UserComponent,
    NotesComponent,
    TeamspacesComponent,
    UserteamspacesComponent,
    AuthtokesComponent,
    LeftmenuComponent,
    HeaderComponent,
    RegistrationpageComponent,
    NewpageComponent,
    SettingswindowComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [ LeftMenuService],
  bootstrap: [AppComponent]
})
export class AppModule { }
