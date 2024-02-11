import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { UserComponent } from './components/user/user.component';
import { NotesComponent } from './components/notes/notes.component';
import { TeamspacesComponent } from './components/teamspaces/teamspaces.component';
import { UserteamspacesComponent } from './components/userteamspaces/userteamspaces.component';
import { AuthtokesComponent } from './components/authtokes/authtokes.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    UserComponent,
    NotesComponent,
    TeamspacesComponent,
    UserteamspacesComponent,
    AuthtokesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
