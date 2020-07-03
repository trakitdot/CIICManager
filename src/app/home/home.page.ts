import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  test: string;

  constructor() {}

  testFunc() {
    this.test = "Home works";
  }
}
