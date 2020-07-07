import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
//import { PostProvider } from '../../providers/post-provider';
import { MySQLServiceService } from './../../services/my-sqlservice.service';
//import { SQLiteServiceService, Dev } from './../services/sqlite-service.service';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-mainbar',
  templateUrl: './mainbar.component.html',
  styleUrls: ['./mainbar.component.scss'],
})
export class MainbarComponent implements OnInit {
  username: string;// = "nk";
  password: string;// = "nk";
  test: string;
  rusername: string = "";
  rpassword: string = "";
  cpassword: string = "";

  constructor(
    private router: Router,
    private MySQLService: MySQLServiceService,
    private storage: Storage,
    public toastCtrl: ToastController
  ) {
    console.log(this.password);
    
   }


  ngOnInit() { }
  createDiv() {
    return "<div class='hero-text'><h1 style='font-size:50px'>Empowering Africans with Farming Solutions.</h1><h3>Some nice capturing text about us as a company / cooperative and how we will</h3></div>";
  }
  async prosesLogin() {//console.log(this.username);
    if (this.username != "" && this.password != "") {
      let body = {
        username: this.username,
        password: this.password,
        aksi: 'login'
      };
      console.log(this.username);
      this.MySQLService.postData(body, 'proses-api.php').subscribe(async (data: object) => {
        //console.error(data);
        console.log(data);//console.warn(data);
        var alertpesan = data['msg'];
        if (data['success']) {
          let member: object = {}
          this.storage.set('session_storage', data['result']).then(res => {
            console.log(res);
            this.storage.get('session_storage').then((res: object) => {
              console.log(res);
              member = res
              //console.log(member);
              let id = member['user_id']
              //console.log(id);              
            })
          }).catch(e => {
            alertpesan = e;console.log(e);
          });
          console.log(member);
          //if (alertpesan == null) this.router.navigate(['/customer']);
          const toast = await this.toastCtrl.create({
            message: alertpesan == null ? 'Login Succesfully.' : alertpesan,//member['user_id'],//data.result.user_id,
            duration: 2000
          });
          toast.present();
          this.username = "";
          this.password = "";
          console.log(data);
        } else {
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
          this.router.navigate(['/login']);
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
  /*slides = [
    {
      title: "Welcome to the Docs!",
      description: "The <b>Ionic Component Documentation</b> showcases a number of useful components that are included out of the box with Ionic.",
      image: "assets/admin.jpg",
    },
    {
      title: "What is Ionic?",
      description: "<b>Ionic Framework</b> is an open source SDK that enables developers to build high quality mobile apps with web technologies like HTML, CSS, and JavaScript.",
      image: "assets/admin.jpg",
    },
    {
      title: "What is Ionic Cloud?",
      description: "The <b>Ionic Cloud</b> is a cloud platform for managing and scaling Ionic apps with integrated services like push notifications, native builds, user auth, and live updating.",
      image: "assets/admin.jpg",
    }
  ];*/
}
