import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Command } from 'src/app/models/command';
import { CommandService } from 'src/app/services/command.service';

@Component({
  selector: 'app-ordres',
  templateUrl: './ordres.component.html',
  styleUrls: ['./ordres.component.css']
})
export class OrdresComponent implements OnInit {
  headers!:HttpHeaders
  commands!:Command[]
  constructor(private cService:CommandService) { }

  ngOnInit(): void {

    const token=sessionStorage.getItem('Token')
    this.headers=new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    this.cService.vendeurCommands(this.headers).subscribe((res)=>{
      this.commands=res
      console.log("commands",res);
      
    })


  }

}
