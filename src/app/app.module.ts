import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { ToolbarModule } from 'primeng/toolbar';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DropdownModule } from 'primeng/dropdown';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { LoginComponent } from './components/login/login.component';
import { LoginService } from './services/login.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CreateAccountComponent } from './components/create-account/create-account.component';
import { MenubarModule } from 'primeng/menubar';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { MegaMenuModule } from 'primeng/megamenu';
import { SplitterModule } from 'primeng/splitter';
import { RaceManagementComponent } from './components/race-management/race-management.component';
import { EventManagementComponent } from './components/setup-event/manageable-event-components/event-management/event-management.component';
import { SetupEventComponent } from './components/setup-event/setup-event.component';
import { ViewPastEventsComponent } from './components/view-past-events/view-past-events.component';
import { EventService } from './services/event.service';
import { ParticipantService } from './services/participant.service';
import { ParticipantManagementComponent } from './components/setup-event/manageable-event-components/participant-management/participant-management.component';
import { StationManagementComponent } from './components/setup-event/manageable-event-components/station-management/station-management.component';
import { CheckInManagementComponent } from './components/setup-event/manageable-event-components/check-in-management/check-in-management.component';
import { OngoingEventComponent } from './components/ongoing-event/ongoing-event.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    LoginComponent,
    CreateAccountComponent,
    RaceManagementComponent,
    EventManagementComponent,
    SetupEventComponent,
    ViewPastEventsComponent,
    ParticipantManagementComponent,
    StationManagementComponent,
    CheckInManagementComponent,
    OngoingEventComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    PasswordModule,
    FormsModule,
    InputTextModule,
    HttpClientModule,
    CardModule,
    MenubarModule,
    ToastModule,
    MegaMenuModule,
    SplitterModule,
    CalendarModule,
    TableModule,
    TieredMenuModule,
    DialogModule,
    ToolbarModule,
    InputNumberModule,
    BrowserAnimationsModule,
    DropdownModule
  ],
  providers: [LoginService, HttpClient, MessageService, EventService, ParticipantService],
  bootstrap: [AppComponent]
})
export class AppModule { }
