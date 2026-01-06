import { Component, OnInit } from '@angular/core';
import {style} from "@angular/animations";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public  authService : AuthService , private  router : Router) { }

  ngOnInit(): void {
  }

  protected readonly style = style;

  handleLogout() {
    this.authService.logout();
  }
}
