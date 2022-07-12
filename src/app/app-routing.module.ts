import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateAccountComponent } from './components/create-account/create-account.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { LoginComponent } from './components/login/login.component';
import { RaceManagementComponent } from './components/race-management/race-management.component';

const routes: Routes = [
  { 
    path: 'home',
    component: LandingPageComponent
  },
  { 
    path: 'create',
    component: CreateAccountComponent
  },
  { 
    path: 'race-hub',
    component: RaceManagementComponent
  },
  { path: '', component: LoginComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
