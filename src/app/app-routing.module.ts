import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatenewpageComponent } from './components/createnewpage/createnewpage.component';
import { RegistrationpageComponent } from './components/registrationpage/registrationpage.component';
import { CreatenewboardComponent } from './components/createnewboard/createnewboard.component';

const routes: Routes = [ 
  { path: "registration", component: RegistrationpageComponent }, 
  /////////////
  { path: "createnewpage/emptypage", component: CreatenewpageComponent }, 
  { path: "createnewpage/board", component: CreatenewboardComponent }, 
  
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
