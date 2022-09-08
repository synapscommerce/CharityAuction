import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public LoginRequest = { BidderNumber : "", PinCode : "" };
  public Step : string = "Number";
  public returnUrl : string = "";

  constructor(private loginService : LoginService, private router : Router, private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  public CheckBidderNumber() {
    this.loginService.CheckBidderNumberExists(this.LoginRequest.BidderNumber).then((result) => {
      if(result.bidderNumberExists == true){
        if(result.hasPin == true)
          this.Step = "Pin";
        else
          this.Step = "SetPin";
      }
    });
  }

  public Login(){
    this.loginService.Login(this.LoginRequest.BidderNumber, this.LoginRequest.PinCode).then(result => {
      if(result == true){
        if(this.returnUrl != "")
          this.router.navigateByUrl(this.returnUrl);
        else
          this.router.navigateByUrl("/");
      }
    })
  }

}
