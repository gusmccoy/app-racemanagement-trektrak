import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateAccountComponent } from './components/create-account/create-account.component';
import { CreateEventComponent } from './components/create-event/create-event.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { LoginComponent } from './components/login/login.component';
import { ManageEventComponent } from './components/manage-event/manage-event.component';
import { RaceManagementComponent } from './components/race-management/race-management.component';
import { ViewPastEventsComponent } from './components/view-past-events/view-past-events.component';

const routes: Routes = [
  { path: 'home', component: LandingPageComponent },
  { path: 'create', component: CreateAccountComponent },
  { path: 'race-hub', component: RaceManagementComponent  },
  { path: 'create-event', component: CreateEventComponent },
  { path: 'manage-event', component: ManageEventComponent },
  { path: 'review-events', component: ViewPastEventsComponent },
  { path: '', component: LoginComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
