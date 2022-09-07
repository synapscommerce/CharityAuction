import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentToken : string ="";

  constructor() { }


  public IsLoggedIn() : boolean{

    return false;
  }
  public CurrentToken() : string
  {
    return this.currentToken;
  }
}
