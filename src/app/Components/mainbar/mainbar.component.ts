import { Component, OnInit } from '@angular/core';
//import { SQLiteServiceService } from 'src/app/Services/sqlite-service.service';
import { Observable } from 'rxjs';
import { SQLiteServiceService } from 'src/app/Services/sqlite-service.service';


@Component({
  selector: 'app-mainbar',
  templateUrl: './mainbar.component.html',
  styleUrls: ['./mainbar.component.scss'],
})
export class MainbarComponent implements OnInit {
  
  user : Observable<object>
  constructor(
    private sqliteService: SQLiteServiceService,
    private storage : Storage
    ) {
    this.getUser()
  
   }


  ngOnInit() { }
  createDiv() {
    return "<div class='hero-text'><h1 style='font-size:50px'>Empowering Africans with Farming Solutions.</h1><h3>Some nice capturing text about us as a company / cooperative and how we will</h3></div>";
  }
  async getUser() {
    await this.storage.get('session_storage_local').then( res => {
      this.user = res
      alert(JSON.stringify(res))
    })
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
