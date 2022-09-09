import { Injectable } from '@angular/core';
import { first, last, Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentToken : string ="";
  private isAdmin : boolean = false;
  private firstName : string = "";
  private lastName : string = "";

  constructor() {
    let storedToken = localStorage.getItem("token");
    if(storedToken != null)
      this.currentToken = storedToken;
    let storedAdmin = localStorage.getItem("isadmin");
    if(storedAdmin != null)
      this.isAdmin = storedAdmin == "true";
    let storedFirstName = localStorage.getItem("firstname");
    if(storedFirstName != null)
      this.firstName = storedFirstName;
    let storedLastName = localStorage.getItem("lastname");
    if(storedLastName != null)
      this.lastName = storedLastName;
   }

  public SetToken(token : string, admin : boolean, firstName : string, lastName : string){
    this.currentToken = token;
    this.isAdmin = admin;
    this.firstName = firstName;
    this.lastName = lastName;

    localStorage.setItem("token", token);
    localStorage.setItem("isadmin", admin ? "true" : "false");
    localStorage.setItem("firstname", firstName);
    localStorage.setItem("lastnamen", lastName);
  }

  public IsLoggedIn() : boolean{
    return this.currentToken != "";
  }

  public IsAdmin() : boolean{
    return this.isAdmin;
  }

  public CurrentToken() : string
  {
    return this.currentToken;
  }

  public FirstName() : string{
    return this.firstName;
  }
}
