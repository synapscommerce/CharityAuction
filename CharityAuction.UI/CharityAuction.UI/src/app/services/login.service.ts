import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './api.service';
import { AuthService } from './auth.service';
import {catchError, interval, of, Subscription } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private timer !: Subscription;
  private lastActivity : Date = new Date();
  private autoLogoutAfterSeconds = 120;
  private inactiveCheckIntervalSeconds : number = 1;
  public pendingAutoLogout = new EventEmitter<number>();
  
  constructor(private apiService : ApiService, private authService : AuthService, private router : Router) {
    const t = interval(this.inactiveCheckIntervalSeconds * 1000);
    this.timer = t.subscribe(result => this.AutoLogoutInterval());

    let storedLastActivity = localStorage.getItem('lastactivity');
    if(storedLastActivity != null && storedLastActivity != ""){
      let last = new Date(parseInt(storedLastActivity));
      this.lastActivity = last;
      this.AutoLogoutInterval();
    }
  }

  public AutoLogoutInterval(){
    if(this.authService.IsLoggedIn()){
      let now = new Date();
      let msTilLogout = this.autoLogoutAfterSeconds*1000 - (now.getTime()-this.lastActivity.getTime());
      if(msTilLogout <= 0){
        console.log("Auto logout due to inactivity");
        this.Logout();
      }
      else{
        this.pendingAutoLogout.emit(Math.round(msTilLogout/1000));
      }
    }
  }

  public ResetAutoLogoutTimer(){
    console.log("Resetting auto logout timer");
    this.lastActivity = new Date();
    localStorage.setItem("lastactivity", ""+this.lastActivity.getTime());
  }

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
          this.authService.SetToken(result.token, result.isAdmin, result.firstName, result.lastName);
          resolve(true); 
        }
        else 
          resolve(false);
      });
    });
    return promise;
  }

  public Logout(){
    this.authService.SetToken("", false, "", "");
    this.router.navigateByUrl("/login");
  }
}
