import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from 'src/app/Services/auth/authentication.service';
// import { AuthenticationService } from 'src/app/Services/Auth/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {

  @Input() name: string;

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {}

  logout() {
    this.authenticationService.logout();
    console.log('Logged Out');
    
  }

}
