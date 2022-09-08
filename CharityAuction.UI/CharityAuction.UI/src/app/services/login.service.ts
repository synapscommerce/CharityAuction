import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private apiService : ApiService, private authService : AuthService) { }

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
}
