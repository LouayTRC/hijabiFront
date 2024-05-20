import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Vendeur } from '../models/vendeur';


@Injectable({
  providedIn: 'root'
})
export class VendeurService {
  baseUrl=environment.apiUrl+"/vendeur"
  constructor(private http:HttpClient) { }

  getVendeurs(headers?: HttpHeaders):Observable<Vendeur[]>{
    return this.http.get<Vendeur[]>(this.baseUrl,{ headers: headers })
  }

  acceptVendeur(id:number,headers?: HttpHeaders):Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/enable/${id}`,{ headers: headers })
  }

  refuseVendeur(id:number,headers?: HttpHeaders):Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/disable/${id}`,{ headers: headers })
  }

  deleteVendeur(id:number,headers?: HttpHeaders):Observable<any>{
    return this.http.delete<any>(`${this.baseUrl}/${id}`,{ headers: headers })
  }
}
