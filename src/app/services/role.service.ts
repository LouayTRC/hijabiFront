import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Role } from '../models/role';

@Injectable({
  providedIn: 'root'
})

export class RoleService {
  baseUrl=environment.apiUrl+"/role"
  constructor(private http:HttpClient) { }

  getRoles():Observable<Role[]>{
    return this.http.get<Role[]>(this.baseUrl)
  }

  getRoleById(id:number):Observable<Role>{
    return this.http.get<Role>(this.baseUrl+"/"+id)
  }
}
