import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './api.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private apiService : ApiService, private authService : AuthService, private router : Router) { }

  public async CheckBidderNumberExists(bidderNumber : string) : Promise<any>{
    let promise = new Promise((resolve, reject) => {
      this.apiService.PostAsync<any>("auth/check", { BidderNumber : bidderNumber})
      .subscribe(result => { 
        resolve(result); 
      });
    });
    return promise;
  }

  public async Login(bidderNumber : string, pinCode : string) : Promise<any>{
    let promise = new Promise((resolve, reject) => {
      this.apiService.PostAsync<any>("auth/login", { BidderNumber : bidderNumber, PinCode : pinCode}).subscribe(result => {
        if(result.token != null){
          this.authService.SetToken(result.token, result.isAdmin);
          resolve(true); 
        }
        else 
          resolve(false);
      });
    });
    return promise;
  }

  public Logout(){
    this.authService.SetToken("", false);
    this.router.navigateByUrl("/login");
  }
}
