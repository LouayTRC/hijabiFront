import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-ajouter-produits',
  templateUrl: './ajouter-produits.component.html',
  styleUrls: ['./ajouter-produits.component.css']
})
export class AjouterProduitsComponent implements OnInit {
  headers!:HttpHeaders
  categories!:Category[];
  newProduct!:FormGroup
  files: File[] = [];
  picUrls: string[] = [];
  constructor(private cService:CategoryService,private fb:FormBuilder,private pservice:ProductService,private fireStorage:AngularFireStorage,private router:Router) { }

  ngOnInit(): void {
    const token = sessionStorage.getItem('Token');
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    this.cService.getCategories().subscribe((res)=>{
      this.categories=res
    })

    this.newProduct=this.fb.group({
      name:[''],
      description:[''],
      qte:[''],
      price:[''],
      category:[''],
      status:[''],
      pics:[''],
      sizes:this.fb.array([]),
      couleurs:this.fb.array([]),
    })
  }

  public get Sizes(){
    return this.newProduct.get('sizes') as FormArray;
  }

  public get Couleurs(){
    return this.newProduct.get('couleurs') as FormArray;
  }
  onAjouterS(){
    this.Sizes.push(this.fb.control(''))
  }

  onAjouterC(){
    this.Couleurs.push(this.fb.control(''))
  }

  addProduct(){
    
    Promise.all(this.files.map(file => this.uploadPic(file)))
      .then(urls => {
        this.newProduct.patchValue({ pics: urls });
        console.log("product", this.newProduct.value);
        this.pservice.addProduct(this.newProduct.value, this.headers).subscribe((res) => {
          console.log("ress", res);
          this.router.navigate(['/dashboard-vendeur/produits']);
        });
      })
      .catch(error => console.error("Error uploading images:", error));
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
  


