import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Vendeur } from 'src/app/models/vendeur';
import { VendeurService } from 'src/app/services/vendeur.service';

@Component({
  selector: 'app-vendeurs',
  templateUrl: './vendeurs.component.html',
  styleUrls: ['./vendeurs.component.css']
})
export class VendeursComponent implements OnInit {
  vendeurs!:Vendeur[]
  headers!: HttpHeaders;
  constructor(private vservice:VendeurService) { }

  ngOnInit(): void {
    const token = sessionStorage.getItem('Token');
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    console.log("hea", this.headers);
    this.vservice.getVendeurs(this.headers).subscribe((res)=>{
      console.log("vendeurs",res);
      this.vendeurs=res
    })
  }

  enableAccount(v:Vendeur){
    this.vservice.acceptVendeur(v._id,this.headers).subscribe((res)=>{
      console.log("res",res);
      // let index=this.vendeurs.indexOf(v)
      // v.user.status=1
      // this.vendeurs[index]=v
      
    })
  }

  disableAccount(v:Vendeur){
    this.vservice.refuseVendeur(v._id,this.headers).subscribe((res)=>{
      console.log("res",res);
      // let index=this.vendeurs.indexOf(v)
      // v.user.status=1
      // this.vendeurs[index]=v
    })
  }

  deleteAccount(v:Vendeur){
    this.vservice.deleteVendeur(v._id,this.headers).subscribe((res)=>{
      console.log("deleted",res);
      this.vendeurs=this.vendeurs.filter(element=>element._id!=v._id)
    })
  }
}
