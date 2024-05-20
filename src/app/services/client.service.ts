import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Client } from '../models/client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  baseUrl=environment.apiUrl+"/client"
  constructor(private http:HttpClient) { }

  getClients(headers?: HttpHeaders):Observable<Client[]>{
    return this.http.get<Client[]>(this.baseUrl,{ headers: headers })
  }
}
