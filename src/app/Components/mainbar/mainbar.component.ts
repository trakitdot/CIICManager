import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mainbar',
  templateUrl: './mainbar.component.html',
  styleUrls: ['./mainbar.component.scss'],
})
export class MainbarComponent implements OnInit {

  constructor() { }

  ngOnInit() {}
createDiv(){
  return "<div class='hero-text'><h1 style='font-size:50px'>Empowering Africans with Farming Solutions.</h1><h3>Some nice capturing text about us as a company / cooperative and how we will</h3></div>";}
}
