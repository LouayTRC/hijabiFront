import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl=environment.apiUrl+"/user"
  constructor(private http:HttpClient) { }

  getUser(headers?: HttpHeaders):Observable<User>{
    return this.http.get<User>(this.baseUrl,{ headers: headers });
  }
}
