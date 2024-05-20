import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { User } from 'src/app/models/user';
import { CommandService } from 'src/app/services/command.service';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit {
  panier!:any[]
  headers!:HttpHeaders
  products!:Product[];
  total:number=0;
  user!:User
  constructor(private cservice:CommandService,private pservice:ProductService,private router:Router,private uservice:UserService){}

  ngOnInit(){
    this.panier=JSON.parse(sessionStorage.getItem("panier") || "[]");
    console.log("panier",this.panier);
    
    this.pservice.listProducts(this.panier).subscribe((res)=>{
      this.products=res
      this.total=this.calculTotal()
      console.log("products",this.products);
      
    })
    const token=sessionStorage.getItem('Token')
    this.headers=new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    this.uservice.getUser(this.headers).subscribe((res)=>{
      this.user=res
      console.log("user",this.user);
      
    })

  }
  validerCommande(){
    console.log("aaa0",this.panier);
    
    if (this.panier.length!=0) {
      this.cservice.createCommand(this.panier,this.headers).subscribe((res)=>{
        console.log("res",res);
        sessionStorage.removeItem("panier")
        this.router.navigate(['/home'])
      })
    }
    
  }
  updateQte(p:Product,qte:String){
    console.log('ahaya',qte);
    
    this.panier=JSON.parse(sessionStorage.getItem("panier") || "[]");

    for (const element of this.panier) {
     
      if(element.idProduct == p._id){
        element.qte=Number(qte);
        console.log("eleemenet",element);
        break;
      }
    }
    sessionStorage.setItem("panier",JSON.stringify(this.panier));

    for (const element of this.products) {
     
      if(element._id == p._id){
        element.qte=Number(qte);
        console.log("eleemenet2",element);
        break;
      }
    }
    
    this.total=this.calculTotal()
  }
  calculTotal(){
    let total=0;
    for (const element of this.products) {
      console.log("qte",element.qte);
      
      total+=element.price*element.qte;
    }
    return total
  }
  deleteFromChart(index:number){
    this.panier=JSON.parse(sessionStorage.getItem("panier") || "[]");
    this.panier.splice(index,1);
    
    sessionStorage.setItem("panier",JSON.stringify(this.panier));
    this.products.splice(index,1)
    this.calculTotal()
    if (this.panier.length==0) {
      this.total=0
    }
  }
}
