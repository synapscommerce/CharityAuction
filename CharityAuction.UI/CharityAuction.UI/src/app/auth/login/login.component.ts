import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public LoginRequest = { BidderNumber : "", PinCode : "" };
  public Step = "BidderNumber";

  constructor(private apiService : ApiService) { }

  ngOnInit(): void {
  }

  public CheckBidderNumber() {
    this.apiService.PostAsync<any>("auth/check", { BidderNumber : this.LoginRequest.BidderNumber}).subscribe(result => {
        if(result.BidderNumberExists == true){
          this.Step = "Pin";
        }
    });
  }

}
