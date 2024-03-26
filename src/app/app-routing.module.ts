import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatenewpageComponent } from './components/createnewpage/createnewpage.component';
import { RegistrationpageComponent } from './components/registrationpage/registrationpage.component';

const routes: Routes = [ 
  {path: "createnewpage", component: CreatenewpageComponent}, // этот выводится через аутлет
  { path: "registration", component: RegistrationpageComponent }, // этот не выводится через аутлет
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
