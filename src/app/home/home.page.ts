import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
//import { PostProvider } from '../../providers/post-provider';
import { MySQLServiceService } from './../Services/my-sqlservice.service';
//import { SQLiteServiceService, Dev } from './../services/sqlite-service.service';
import { Storage } from '@ionic/storage';
import { AuthenticationService } from '../Services/auth/Authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  username: string;
  password: string;
  test: string;
  rusername: string = "";
  rpassword: string = "";
  cpassword: string = "";

  constructor(
    private router: Router,
    private MySQLService: MySQLServiceService,
    private storage: Storage,
    public toastCtrl: ToastController,
    private authenticationService: AuthenticationService
  ) { }

  testFunc() {
    this.test = "Home works";
  }

  logout() {
    this.authenticationService.logout();
  }

  
}