import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateAccountComponent } from './components/create-account/create-account.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { LoginComponent } from './components/login/login.component';
import { SetupEventComponent } from './components/setup-event/setup-event.component';
import { OngoingEventComponent } from './components/ongoing-event/ongoing-event.component';
import { RaceManagementComponent } from './components/race-management/race-management.component';
import { ViewPastEventsComponent } from './components/view-past-events/view-past-events.component';

const routes: Routes = [
  { path: 'home', component: LandingPageComponent },
  { path: 'create-account', component: CreateAccountComponent },
  { path: 'race-hub', component: RaceManagementComponent  },
  { path: 'manage-event', component: SetupEventComponent },
  { path: 'review-events', component: ViewPastEventsComponent },
  { path: 'ongoing-event', component: OngoingEventComponent },
  { path: '', component: LoginComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
