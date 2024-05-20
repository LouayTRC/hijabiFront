import { HttpClient } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl=environment.apiUrl+"/auth"

  user = new BehaviorSubject<any>(null)
  getUser=this.user.asObservable()
  
  constructor(private http:HttpClient,private router:Router) { }

  login(form:any):Observable<any>{
    return this.http.post<any>(this.baseUrl+"/login",form)
  }

  logout(){
    sessionStorage.removeItem("Token");
    this.setUser(undefined)
    this.router.navigate(["/home"])
  }

  signup(form:User):Observable<any>{
    return this.http.post<any>(this.baseUrl+"/signup",form)
  }

  verifyToken(token:string):Observable<any>{
    return this.http.post<any>(this.baseUrl+"/verify",{token});
  }

  setUser(aa:any){
    this.user.next(aa)
  }
}
