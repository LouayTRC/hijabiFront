import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Comment } from '../models/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  baseUrl=environment.apiUrl+"/comment"
  constructor(private http:HttpClient) { }

  addComment(text:String,id:number,headers?: HttpHeaders):Observable<Comment>{
    return this.http.post<Comment>(`${this.baseUrl}/new/${id}`,{description:text},{ headers: headers })
  }

  reply(text:String,idP:number,idC:number,headers?: HttpHeaders):Observable<Comment>{
    return this.http.post<Comment>(`${this.baseUrl}/reply/${idP}/${idC}`,{description:text},{ headers: headers })
  }

  deleteComment(id:number,headers?: HttpHeaders):Observable<Comment>{
    return this.http.get<Comment>(`${this.baseUrl}/${id}`,{ headers: headers })
  }
}
