import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './services/auth.service';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'CharityAuction.UI';
  public ShowMenu : boolean = false;
  public LogoUrl : string = environment.apiUrl + "/public/images/currentauction";
  public SecondsTilLogout = 0;

  constructor(public authService : AuthService, public loginService : LoginService){
    loginService.pendingAutoLogout.subscribe((seconds : number) => {
      this.SecondsTilLogout = seconds;
    });

  }
}
