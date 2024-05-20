import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Command } from '../models/command';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommandService {
  baseUrl=environment.apiUrl+"/cmmd"
  constructor(private http:HttpClient) { }

  createCommand(products:any,headers?: HttpHeaders):Observable<Command>{
    return this.http.post<Command>(this.baseUrl,products,{ headers: headers })
  }

  getCommands(headers?: HttpHeaders):Observable<Command[]>{
    return this.http.get<Command[]>(this.baseUrl,{ headers: headers })
  }

  getCommandById(id:number,headers?: HttpHeaders):Observable<Command>{
    return this.http.get<Command>(`${this.baseUrl}/${id}`,{ headers: headers })
  }
}
