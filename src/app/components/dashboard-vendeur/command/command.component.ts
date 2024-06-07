import { HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Command } from 'src/app/models/command';
import { CommandService } from 'src/app/services/command.service';

@Component({
  selector: 'app-command',
  templateUrl: './command.component.html',
  styleUrls: ['./command.component.css']
})
export class CommandComponent {
  command!:Command
  headers!: HttpHeaders;
  constructor(private active:ActivatedRoute,private cService:CommandService){}

  ngOnInit(){
    const token=sessionStorage.getItem('Token')
    this.headers=new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    
    const id=this.active.snapshot.params['id'];
    console.log("id",id);
    this.cService.getCommandById(id,this.headers).subscribe((res)=>{
      this.command=res
      console.log("cmmd",this.command);
      
    })
  }
}
