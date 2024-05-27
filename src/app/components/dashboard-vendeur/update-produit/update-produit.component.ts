import { HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-update-produit',
  templateUrl: './update-produit.component.html',
  styleUrls: ['./update-produit.component.css']
})
export class UpdateProduitComponent { 
  product!:Product
  files!:File[]
  headers!:HttpHeaders
  categories!:Category[]
  constructor(private active:ActivatedRoute,private pservice:ProductService,private cService:CategoryService,private fireStorage:AngularFireStorage,private router:Router){}

  ngOnInit(){
    
    const token = sessionStorage.getItem('Token');
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    this.cService.getCategories().subscribe((res)=>{
      this.categories=res
    })


    const id=this.active.snapshot.params['id']
    console.log("id",id);

    this.pservice.getProductById(id).subscribe((res)=>{
      this.product=res
      console.log("product",this.product);
      
    })
  }
  updateProduct(){
    if (this.files && this.files.length > 0) {
      Promise.all(this.files.map(file => this.uploadPic(file)))
        .then(urls => {
          this.product.pics=urls;
          console.log("product", this.product);
          this.pservice.updateProduct(this.product, this.headers).subscribe((res) => {
            console.log("ress", res);
            this.router.navigate(['/dashboard-vendeur/produits']);
          });
        })
        .catch(error => console.error("Error uploading images:", error));
    } else {
      console.log('prodict upfate',this.product);
      
      this.pservice.updateProduct(this.product, this.headers).subscribe((res) => {
        console.log("ress", res);
        this.router.navigate(['/dashboard-vendeur/produits']);
      });
    }
  }
  onFileChange(event:any){
    this.files = Array.from(event.target.files);
    console.log("dd",this.files);
  }
  async uploadPic(f:File): Promise<string>{
    const path=`products/${f.name}`
    const upload=await this.fireStorage.upload(path,f)
    const url=await upload.ref.getDownloadURL()
    return url;    
  }

  
}
