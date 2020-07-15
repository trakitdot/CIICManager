import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, IonSlides } from '@ionic/angular';
import { MySQLServiceService } from '../Services/my-sqlservice.service';
import { SQLiteServiceService } from './../Services/sqlite-service.service';
import { Storage } from '@ionic/storage';

import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { AuthenticationService } from '../Services/Auth/authentication.service';
@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  @ViewChild('slides', {static: true})  slides: IonSlides;
  
  username: string;// = "nk";
  password: string;// = "nk";
  test: string;
  rusername: string = "";
  rpassword: string = "";
  cpassword: string = "";

  loginFormValidator: FormGroup;
  
  slideOpts = {
    initialSlide: 1,
    speed: 400,
  };
  constructor(
    private router: Router,
    private authencticationService: AuthenticationService,
    private MySQLService: MySQLServiceService,
    private storage: Storage,
    public toastCtrl: ToastController,
    public fb: FormBuilder,
    private sqliteService : SQLiteServiceService
  ) { }

  ngOnInit() {
    this.loginFormValidator = this.fb.group(
      {
        usernameLogin: new FormControl('', Validators.required),
        passwordLogin: new FormControl('', Validators.compose([Validators.minLength(5), Validators.maxLength(10), Validators.required])),
      }
    )
  }

  
  public get Username() {
    return this.loginFormValidator.get('usernameLogin')
  }
  public get Password() {
    return this.loginFormValidator.get('passwordLogin')
  }
  

  swipeNext(){
    this.slides.slideNext();
  }

  swipePrev() {
    this.slides.slidePrev();
  }

  async prosesLogin() {//console.log(this.username);
    this.authencticationService.login(this.username, this.password);
    let body = { username: this.username, password: this.password } // edit out after
    this.login(body)  // edit out
  }
  login(body) {
    return this.sqliteService.loginUser(body).then( (localData: any) => {
      this.storage.set('localID', localData.res.rows.item(0).id).then( res => {

      })
      this.storage.set('session_storage_local', body).then( res => {
        alert(`saving to local storage: ${body}`)
      })
      this.router.navigate(['/home'])
      return alert(`local user: ${JSON.stringify(localData)}`)
    })
  }
  gotoSignIN() {
    this.router.navigate(['/login']);
  }
  gotoSignUP() {
    this.router.navigate(['/register']);
  }
  forgotPassword() {
    this.router.navigate(['/home']);
  }
  async prosesRegister() {
    // validation done
    if (this.rusername == "") {
      const toast = await this.toastCtrl.create({
        message: 'Username is required',
        duration: 3000
      });
      toast.present();
    } else if (this.rpassword == "") {
      const toast = await this.toastCtrl.create({
        message: 'Password is required',
        duration: 3000
      });
      toast.present();
    } else if (this.rpassword != this.cpassword) {
      const toast = await this.toastCtrl.create({
        message: 'Invalid password',
        duration: 3000
      });
      toast.present();
    } else {

      let body = {
        username: this.rusername,
        password: this.rpassword,
        aksi: 'register'
      };
      alert(`user data on registration: ${body}`)
      this.saveUser(body) // this should be down in the async function but it doesnt seem to fire
      this.MySQLService.postData(body, 'proses-api.php').subscribe(async (data: object) => {
        var alertpesan = data['msg'];
        alert(`regOnlineData: ${JSON.stringify(data)}`)
        if (data['success']) {
          console.log('created',data);
          this.saveUser(body)
          alert(`created: ${data}`)
          this.swipePrev();
          
          const toast = await this.toastCtrl.create({
            message: 'Register succesful',
            duration: 3000
          });
          toast.present();
        } else {
          const toast = await this.toastCtrl.create({
            message: alertpesan,
            duration: 3000
          });
          toast.present();
        }
      });

    }
  }
  saveUser(body) {
    let {username, password} = body
    alert(`user: ${username}, password: ${password}`)
    return this.sqliteService.registerUser(body).then( (localReg : any) => {
      alert(`localReg: ${JSON.stringify(localReg)}`)
      if(localReg.success) {
        return this.sqliteService.retrieveUser(localReg.res.insertId).then( localUser => {
          if(localUser.success) {
            try {
              let user : string = localUser.res.rows.item(0).username
              let pass : string = localUser.res.rows.item(0).password
              alert(`username: ${user}, password: ${pass}`)
            } catch (error) {
              alert(JSON.stringify(error))
            }
            alert(`ID: ${localReg.res.insertId}`)
            return this.storage.set('localID', localReg.res.insertId).then( res => {
              alert(`localID res: ${JSON.stringify(res)}`)
              return this.storage.get('localID').then(result => {
                alert(`localID returns: ${JSON.stringify(result)}`)
              })
            })
          } else {
            alert(`localUser Err: ${localUser.msg}`)
          }
        })

      } else {

      }


    })
  }

}
