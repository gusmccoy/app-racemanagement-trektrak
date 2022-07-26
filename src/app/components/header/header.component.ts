import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [ LoginService ]
})
export class HeaderComponent implements OnInit {

  items: MenuItem[] = [];

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
    this.items = [
      {
        label:'Home',
        icon:'pi pi-fw pi-home'
      },
      {
        label:'Manage',
        icon:'pi pi-fw pi-pencil'
      },
      {
        label:'Invite Others',
        icon:'pi pi-fw pi-users'
      },
      {
        label:'About',
        icon:'pi pi-fw pi-info-circle',
      },
      {
        label:'Log Out',
        icon:'pi pi-fw pi-power-off'
      }
    ];
  }

  get isSidebarVisible(): boolean {
    return this.loginService.isLoggedIn;
  }

}
