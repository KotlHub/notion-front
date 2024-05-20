import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatenewpageComponent } from './components/createnewpage/createnewpage.component';
import { RegistrationpageComponent } from './components/registrationpage/registrationpage.component';
import { CreatenewboardComponent } from './components/createnewboard/createnewboard.component';
import { CreatenewlistComponent } from './components/createnewlist/createnewlist.component';
import { CreatenewgalleryComponent } from './components/createnewgallery/createnewgallery.component';
import { CreatenewtableComponent } from './components/createnewtable/createnewtable.component';
import { LandingComponent } from './components/landing/landing.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [ 
  { path: "registration", component: RegistrationpageComponent }, 
  { path: "welcome", component: LandingComponent }, 
  { path: "", component: HomeComponent }, 

  /////////////
  { path: "createnewpage/emptypage/:id", component: CreatenewpageComponent }, 
  { path: "createnewpage/board/:id", component: CreatenewboardComponent }, 
  { path: "createnewpage/list/:id", component: CreatenewlistComponent }, 
  { path: "createnewpage/gallery/:id", component: CreatenewgalleryComponent }, 
  { path: "createnewpage/table/:id", component: CreatenewtableComponent }, 
  
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
