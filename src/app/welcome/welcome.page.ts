import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, IonSlides } from '@ionic/angular';
//import { PostProvider } from '../../providers/post-provider';
import { MySQLServiceService } from '../Services/my-sqlservice.service';
//import { SQLiteServiceService, Dev } from './../services/sqlite-service.service';
import { Storage } from '@ionic/storage';
import { AuthenticationService } from '../Services/auth/authentication.service';
//validations
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
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
    public fb: FormBuilder
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

      this.MySQLService.postData(body, 'proses-api.php').subscribe(async (data: object) => {
        var alertpesan = data['msg'];
        if (data['success']) {
          console.log('created',data);

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

}
