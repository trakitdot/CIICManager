import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { HTTP } from '@ionic-native/http/ngx';

import { IonicStorageModule } from '@ionic/storage';
import { SQLite } from '@ionic-native/sqlite/ngx'

import { FormsModule } from '@angular/forms';
import { AuthenticationService } from './Services/auth/authentication.service';
import { AuthGuardService } from './Services/auth/auth-guard.service';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [FormsModule,BrowserModule, IonicModule.forRoot(), AppRoutingModule,HttpClientModule,IonicStorageModule.forRoot()/*,IonicStorageModule.forRoot({
    name: '__mydb',
driverOrder: ['indexeddb', 'sqlite', 'websql', 'localstorage']
  })*/],
  providers: [HTTP,
    AuthenticationService,
    AuthGuardService,
    StatusBar,
    SplashScreen,
    SQLite,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
