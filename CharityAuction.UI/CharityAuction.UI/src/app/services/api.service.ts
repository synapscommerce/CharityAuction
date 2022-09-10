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
    return this.httpClient.get<T>(environment.apiUrl + "/" + url, { headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.authService.CurrentToken()) });
  }

  public PostAsync<T>(url : string, data : any) : Observable<T> {
    return this.httpClient.post<T>(environment.apiUrl + "/" + url, data, { headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.authService.CurrentToken()) });
  }
  public PutAsync<T>(url : string, data : any) : Observable<T> {
    return this.httpClient.put<T>(environment.apiUrl + "/" + url, data, { headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.authService.CurrentToken()) });
  }
  public DeleteAsync<T>(url : string) : Observable<T> {
    return this.httpClient.delete<T>(environment.apiUrl + "/" + url, { headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.authService.CurrentToken()) });
  }
}
