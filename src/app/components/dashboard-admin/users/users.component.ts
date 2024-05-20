import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/models/client';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  headers!: HttpHeaders;
  clients!:Client[]

  constructor(private cservice:ClientService) { }

  ngOnInit(): void {
    const token = sessionStorage.getItem('Token');
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    console.log("hea", this.headers);
    this.cservice.getClients(this.headers).subscribe((res)=>{
      console.log("clients",res);
      this.clients=res
    })
  }

}
