import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//import { SaveFormsGuard } from './can-deactivate';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { LoginComponent } from './components/login/login.component';
import { LoginRouteGuard } from './login-route-guard';

const routes: Routes = [
  { 
    path: 'home',
    component: LandingPageComponent,
    //canActivate: [LoginRouteGuard],
    //canDeactivate: [SaveFormsGuard]
  },
  { path: '', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
