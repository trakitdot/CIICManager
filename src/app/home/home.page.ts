import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
//import { PostProvider } from '../../providers/post-provider';
import { MySQLServiceService } from './../Services/my-sqlservice.service';
import { SQLiteServiceService } from './../Services/sqlite-service.service';
import { Storage } from '@ionic/storage';
import { AuthenticationService } from '../Services/auth/authentication.service';

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
    private sqlService : SQLiteServiceService,
    private authenticationService: AuthenticationService,
  ) { }

  testFunc() {
    this.test = "Home works";
  }

  logout() {
    this.authenticationService.logout();
  }
  register() {
      let body = {
        username: this.rusername,
        password: this.rpassword,
        aksi: 'register'
      };

      this.MySQLService.postData(body, 'proses-api.php').subscribe(async  (data: object) => {
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

  registerUser() {
    let body = {name: 'Willington', username: 'Wylie', password: '@Weyting'}
    return this.sqlService.registerUser(body).then( (res : any) => {
      alert(`res: ${JSON.stringify(res)}`)
      alert(`res.res: ${JSON.stringify(res.res)}`)
      alert(`res['res']: ${JSON.stringify(res['res'])}`)
      alert(`row: ${JSON.stringify(res.res.rows.item(0))}`)
      alert(`data: ${res.res.rows.item(0).name}, ${res.res.rows.item(0).surname}, ${res.res.rows.item(0).password}`)
    })
  }
  deleteUser() {
    return this.sqlService.deleteUser(1).then( res => {
      alert(`res: ${JSON.stringify(res)}`)
      alert(`data: ${res.res.rows.item(0).name}, ${res.res.rows.item(0).surname}, ${res.res.rows.item(0).password}`)
    })
  }
  updateUser() {
    return this.sqlService.updateUser('Vukona', 'Uxe', '@Weiting', 1).then( res => {
      alert(`res: ${JSON.stringify(res)}`)
      alert(`data: ${res.res.rows.item(0).name}, ${res.res.rows.item(0).surname}, ${res.res.rows.item(0).password}`)
    })
  }
  retrieveUser() {
    return this.sqlService.retrieveUser(1).then( res => {
      alert(`res: ${JSON.stringify(res)}`)
      alert(`res: ${JSON.stringify(res.res.rows.item(0).name)}, ${res.res.rows.item(0).surname}, ${res.res.rows.item(0).password}`)
    })
  }
  createTable() {
    return this.sqlService.createUserTable().then( res => {
      alert(`res: ${JSON.stringify(res)}`)
    })
  }
  createDatabase() {
    return this.sqlService.createDatabase().then( res => {
      alert(`res: ${JSON.stringify(res)}`)
    })
  }
  // read() {
  //   return this.sqlService.getUser(1).then()
  // }
}