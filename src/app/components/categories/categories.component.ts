import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categorie: any;
  filtredProducts!: Product[];
  products!: Product[];

  constructor(
    private router: Router, 
    private viewportScroller: ViewportScroller, 
    private act: ActivatedRoute, 
    private pservice: ProductService
  ) {}

  ngOnInit(): void {
    this.pservice.getProducts().subscribe((res) => {
      this.filtredProducts = res;
      this.products = structuredClone(this.filtredProducts);
      
      this.act.paramMap.subscribe((params: { get: (arg0: string) => any; }) => {
        this.categorie = params.get('cat');
        
        if (this.categorie !== 'tous') {
          this.filtredProducts = this.products.filter(element => element.category.name === this.categorie);
        } else {
          this.filtredProducts = this.products;
        }
      });

      this.router.events.subscribe((event: any) => {
        if (event instanceof NavigationEnd) {
          this.viewportScroller.scrollToPosition([0, 0]);
        }
      });
    });
  }

  onSortChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const sortOption = selectElement.value;

    switch (sortOption) {

      case 'bestSales':
        this.filtredProducts.sort((a, b) => b.price - a.price);
        break;
      case 'priceLowHigh':
        this.filtredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'priceHighLow':
        this.filtredProducts.sort((a, b) => b.price - a.price);
        break;
 
      default:
        break;
    }
  }
}
