import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products!:Product[]
  constructor(private pservice:ProductService) { }
  

  ngOnInit(): void {
    this.pservice.getProducts().subscribe((res)=>{
      this.products=res
    })
  }


}
