import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  baseUrl=environment.apiUrl+"/product"
  constructor(private http:HttpClient) { }

  addProduct(form:Product,headers?: HttpHeaders):Observable<Product>{
    return this.http.post<Product>(this.baseUrl,form,{ headers: headers })
  }

  getProducts():Observable<Product[]>{
    return this.http.get<Product[]>(this.baseUrl)
  }

  getProductById(id:number):Observable<Product>{
    return this.http.get<Product>(`${this.baseUrl}/${id}`)
  }

  updateProduct(form:Product,headers?: HttpHeaders):Observable<any>{
    return this.http.put<any>(`${this.baseUrl}/${form._id}`,form,{ headers: headers })
  }

  deleteProduct(id:number,headers?: HttpHeaders):Observable<any>{
    return this.http.delete<any>(`${this.baseUrl}/${id}`,{ headers: headers })
  }

  myProducts(headers?: HttpHeaders):Observable<Product[]>{
    return this.http.get<Product[]>(this.baseUrl+"/mine",{ headers: headers })
  }

  listProducts(idProducts:any[]):Observable<Product[]>{
    return this.http.post<Product[]>(`${this.baseUrl}/list`,idProducts)
  }
}
