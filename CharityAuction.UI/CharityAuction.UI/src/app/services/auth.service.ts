import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentToken : string ="";
  private isAdmin : boolean = false;

  constructor() {
    let storedToken = localStorage.getItem("token");
    if(storedToken != null)
      this.currentToken = storedToken;
    let storedAdmin = localStorage.getItem("admin");
    if(storedAdmin != null)
      this.isAdmin = storedAdmin == "true";
   }

  public SetToken(token : string, admin : boolean){
    this.currentToken = token;
    this.isAdmin = admin;

    localStorage.setItem("token", token);
    localStorage.setItem("isAdmin", admin ? "true" : "false");
  }

  public IsLoggedIn() : boolean{
    console.log("Checking IsLoggedIn() : " + this.currentToken != "");
    return this.currentToken != "";
  }

  public IsAdmin() : boolean{
    return this.isAdmin;
  }

  public CurrentToken() : string
  {
    return this.currentToken;
  }
}
