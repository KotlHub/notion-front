import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { LeftmenuComponent } from './components/leftmenu/leftmenu.component';
import { HeaderComponent } from './components/header/header.component';
import { LeftMenuService } from './services/left-menu.service';
import { RegistrationpageComponent } from './components/registrationpage/registrationpage.component';
import { NewpageComponent } from './components/newpage/newpage.component';
import { SettingswindowComponent } from './components/settingswindow/settingswindow.component';
import { SearchpageComponent } from './components/searchpage/searchpage.component';
import { CreatenewpageComponent } from './components/createnewpage/createnewpage.component';
import { BigmodalwindowComponent } from './components/bigmodalwindow/bigmodalwindow.component';
import { CreatenewboardComponent } from './components/createnewboard/createnewboard.component';
import { HttpClientModule } from '@angular/common/http';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CreatenewlistComponent } from './components/createnewlist/createnewlist.component';
import { CreatenewgalleryComponent } from './components/createnewgallery/createnewgallery.component';
import { CreatenewtableComponent } from './components/createnewtable/createnewtable.component';
import { LandingComponent } from './components/landing/landing.component';
import { HomeComponent } from './components/home/home.component';
import { UsersettingsComponent } from './components/usersettings/usersettings.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { TemplatesComponent } from './components/templates/templates.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    LeftmenuComponent,
    HeaderComponent,
    RegistrationpageComponent,
    NewpageComponent,
    SettingswindowComponent,
    SearchpageComponent,
    CreatenewpageComponent,
    BigmodalwindowComponent,
    CreatenewboardComponent,
    CreatenewlistComponent,
    CreatenewgalleryComponent,
    CreatenewtableComponent,
    LandingComponent,
    HomeComponent,
    UsersettingsComponent,
    NotfoundComponent,
    TemplatesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    DragDropModule,
  ],
  providers: [ LeftMenuService],
  bootstrap: [AppComponent]
})
export class AppModule { }
