import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css']
})
export class ProduitsComponent implements OnInit {
  headers!: HttpHeaders;
  products!:Product[]
  constructor(private pservice:ProductService,private router:Router) { }

  ngOnInit(): void {
    const token = sessionStorage.getItem('Token');
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    this.pservice.myProducts(this.headers).subscribe((res)=>{
      this.products=res
      console.log("products",res);
      
    })
  }

  deleteProduct(p:Product){
    console.log("here");
    this.pservice.deleteProduct(p._id,this.headers).subscribe((res)=>{
      console.log("res",res);
      this.products = this.products.filter(element => element._id !== p._id);
    })
  }

  goUpdate(id:number){
    this.router.navigate(['/dashboard-vendeur/modifierProduit/',id])
  }
}
