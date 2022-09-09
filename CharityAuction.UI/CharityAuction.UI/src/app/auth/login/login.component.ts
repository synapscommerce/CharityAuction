import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { LoginService } from 'src/app/services/login.service';
import { faDeleteLeft, faCircle } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public Icons = {faDeleteLeft : faDeleteLeft, faCircle : faCircle}
  public LoginRequest : any = { BidderNumber : "", PinCode : "" };
  public Step : string = "Number";
  public returnUrl : string = "";

  constructor(private loginService : LoginService, private router : Router, private route : ActivatedRoute,  private toastr: ToastrService) { }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  public Back(){
    this.Step = "Number";
  }

  public KeyPressed(char : string){
    switch(this.Step){
      case "Number":
        this.LoginRequest.BidderNumber += char;
      break;
      case "Pin":
      case "SetPin":
        this.LoginRequest.PinCode += char;
      break;
    }
  }

  public Backspace(){
    switch(this.Step){
      case "Number":
        if(this.LoginRequest.BidderNumber.length > 0)
          this.LoginRequest.BidderNumber = this.LoginRequest.BidderNumber.substring(0, this.LoginRequest.BidderNumber.length-1);
      break;
      case "Pin":
        case "SetPin":
        if(this.LoginRequest.PinCode.length > 0)
          this.LoginRequest.PinCode = this.LoginRequest.PinCode.substring(0, this.LoginRequest.PinCode.length-1);
      break;
    }
  }

  public CheckBidderNumber() {
    this.loginService.CheckBidderNumberExists(this.LoginRequest.BidderNumber).then((result) => {
      if(result.bidderNumberExists == true){
        if(result.hasPin == true)
          this.Step = "Pin";
        else
          this.Step = "SetPin";
      }
      else{
        this.toastr.warning("Unknown Bidder Number", "Error");
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
