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
// import { AuthenticationService } from './Services/Auth/authentication.service';
// import { AuthGuardService } from './Services/Auth/auth-guard.service';
import { MySQLServiceService } from './Services/my-sqlservice.service';
import { ReactiveFormsModule } from '@angular/forms';
import { QuestionService } from './Services/DynamicForm/question.service';
import { AuthenticationService } from './Services/auth/authentication.service';
import { AuthGuardService } from './Services/auth/auth-guard.service';

@NgModule({
  declarations: [AppComponent ],
  entryComponents: [],
  imports: [FormsModule,ReactiveFormsModule, 
            BrowserModule, 
            IonicModule.forRoot(), AppRoutingModule,HttpClientModule, IonicStorageModule.forRoot()],
  providers: [HTTP,
     AuthenticationService,
     AuthGuardService,
     MySQLServiceService,
     QuestionService,
    StatusBar,
    SplashScreen,
    SQLite,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
