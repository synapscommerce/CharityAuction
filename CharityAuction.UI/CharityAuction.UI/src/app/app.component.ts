import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'CharityAuction.UI';

  constructor(public authService : AuthService, public loginService : LoginService){

  }
}
