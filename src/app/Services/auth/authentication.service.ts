import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Platform, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { MySQLServiceService } from '../my-sqlservice.service';
//import { SQLiteServiceService } from '../sqlite-service.service';
import { promise } from 'protractor';
import { SQLiteServiceService } from '../sqlite-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  authState = new BehaviorSubject(false);
  

  constructor(
    private router: Router,
    private storage: Storage,
    private platform: Platform,
    private MySQLService: MySQLServiceService,
    public toastCtrl: ToastController,
    private sqliteService : SQLiteServiceService
  ) {
    this.platform.ready().then(() => {
      this.ifLoggedIn();
    });
  }
  ifLoggedIn() {
    this.storage.get('member').then((res: object) => {
      if (res) {
        this.authState.next(true);
      }             
    })
  }
  async login(username, password) {
    if (username != "" && password != "") {
      let body = {
        username: username,
        password: password,
        aksi: 'login'
      };
     
      this.MySQLService.postData(body, 'proses-api.php').subscribe(async (data: object) => {
        //console.error(data);
        console.log(data);//console.warn(data);
        var alertpesan = data['msg'];
        if (data['success']) {
          let member: object = {}
          await this.localLogin(body)
          this.storage.set('session_storage', data['result']).then(res => {
            this.router.navigate(['home']);
            this.authState.next(true);
          }).catch(async e => {
            
            alertpesan = e;console.log(e);
          });
          const toast = await this.toastCtrl.create({
            message: alertpesan == null ? 'Login Succesfully.' : alertpesan,//member['user_id'],//data.result.user_id,
            duration: 2000
          });
          toast.present();
          username = "";
          password = "";
          console.log(data);
        } else {
          this.localLogin(body).then( (local) => {
            
          })
          const toast = await this.toastCtrl.create({
            message: alertpesan,
            duration: 2000
          });
          toast.present();
        }
      });

    } else {
      const toast = await this.toastCtrl.create({
        message: 'Username or Password Invalid.',
        duration: 2000
      });
      toast.present();
    }
  }
  localLogin(body) : Promise<void> {
    return this.sqliteService.loginUser(body).then( (localData: object) => {
      this.storage.set('session_storage_local', body).then( res => {
        alert(`saving to local storage: ${body}`)
      })
      return alert(`local user: ${JSON.stringify(localData)}`)
    })
  }
  logout() {
    this.storage.remove('session_storage').then((res: object) => {
      this.router.navigate(['/welcome']);
      this.authState.next(false);
      this.storage.remove('session_storage_local').then( data => {
        
      })          
    })
  }

  isAuthenticated(){
    return this.authState.value;
  }
}
