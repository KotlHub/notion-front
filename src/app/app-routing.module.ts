import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatenewpageComponent } from './components/createnewpage/createnewpage.component';
import { RegistrationpageComponent } from './components/registrationpage/registrationpage.component';
import { CreatenewboardComponent } from './components/createnewboard/createnewboard.component';
import { CreatenewlistComponent } from './components/createnewlist/createnewlist.component';
import { CreatenewgalleryComponent } from './components/createnewgallery/createnewgallery.component';

const routes: Routes = [ 
  { path: "registration", component: RegistrationpageComponent }, 
  /////////////
  { path: "createnewpage/emptypage", component: CreatenewpageComponent }, 
  { path: "createnewpage/board", component: CreatenewboardComponent }, 
  { path: "createnewpage/list", component: CreatenewlistComponent }, 
  { path: "createnewpage/gallery", component: CreatenewgalleryComponent }, 
  
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
