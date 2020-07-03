import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { FootbarComponent } from '../Components/footbar/footbar.component';
import { NavbarComponent } from '../Components/navbar/navbar.component';
import { MainbarComponent } from '../Components/mainbar/mainbar.component';
import { SidebarComponent } from '../Components/sidebar/sidebar.component';

import { Router } from '@angular/router';
//import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
//import { PostProvider } from '../../providers/post-provider';
import { MySQLServiceService } from './../services/my-sqlservice.service';
import { SQLiteServiceService, Dev } from './../services/sqlite-service.service';
import { Storage } from '@ionic/Storage';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    
  ],
  declarations: [HomePage, FootbarComponent, NavbarComponent, MainbarComponent, SidebarComponent],
  entryComponents: [FootbarComponent, NavbarComponent, MainbarComponent, SidebarComponent]
  

  
})
export class HomePageModule {}



