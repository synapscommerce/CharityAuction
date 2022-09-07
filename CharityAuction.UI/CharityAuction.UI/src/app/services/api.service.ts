import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient : HttpClient, private authService : AuthService) { }


  public GetAsync<T>(url : string) : Observable<T> {
    const headers = new HttpHeaders();
    headers.set('Authorization', 'Bearer ' + this.authService.CurrentToken());
    return this.httpClient.get<T>(url, { headers: headers });
  }

  public PostAsync<T>(url : string, data : any) : Observable<T> {
    const headers = new HttpHeaders();
    headers.set('Authorization', 'Bearer ' + this.authService.CurrentToken());
    return this.httpClient.post<T>(environment.apiUrl + "/" + url, data, { headers: headers });
  }
}
