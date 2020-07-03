import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
//import { PostProvider } from '../../providers/post-provider';
import { MySQLServiceService } from './../services/my-sqlservice.service';
//import { SQLiteServiceService, Dev } from './../services/sqlite-service.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  test: string;

  constructor() {}

  testFunc() {
    this.test = "Home works";
  }
}
