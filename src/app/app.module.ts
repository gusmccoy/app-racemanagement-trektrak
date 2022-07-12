import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonModule } from 'primeng/button';
import {PasswordModule} from 'primeng/password';
import {InputTextModule} from 'primeng/inputtext';
import {CardModule} from 'primeng/card';

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
import {MegaMenuModule} from 'primeng/megamenu';
import {SplitterModule} from 'primeng/splitter';
import { RaceManagementComponent } from './components/race-management/race-management.component';
import { CreateEventComponent } from './components/create-event/create-event.component';
import { ManageEventComponent } from './components/manage-event/manage-event.component';
import { ViewPastEventsComponent } from './components/view-past-events/view-past-events.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    LoginComponent,
    CreateAccountComponent,
    RaceManagementComponent,
    CreateEventComponent,
    ManageEventComponent,
    ViewPastEventsComponent
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
    SplitterModule
  ],
  providers: [LoginService, HttpClient, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
