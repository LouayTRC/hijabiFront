import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { tick } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { Comment } from 'src/app/models/comment';
import { Product } from 'src/app/models/product';
import { Role } from 'src/app/models/role';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { CommentService } from 'src/app/services/comment.service';
import { ProductService } from 'src/app/services/product.service';
import { RoleService } from 'src/app/services/role.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  product!:Product
  productCmmd!:any
  id!:number
  headers!: HttpHeaders;
  user!:any
  role!:Role
  constructor(private active:ActivatedRoute,private pservice:ProductService,private cService:CommentService,private authService:AuthService,private roleService:RoleService) { }

  ngOnInit(): void {
    this.id=this.active.snapshot.params['id'];
    console.log("id",this.id);

    this.authService.user.subscribe((res)=>{
      this.user=res
      console.log("article user",this.user);
      this.roleService.getRoleById(this.user.user_Role).subscribe((res2)=>{
        this.role=res2
        console.log("role",this.role);
        
      })
    })

    const token=sessionStorage.getItem('Token')
    this.headers=new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    
    this.pservice.getProductById(this.id).subscribe((res)=>{
      this.product=res
      console.log('pr',this.product);
      
    })
  }
  addToCart(qte:String) {
    const panier = JSON.parse(sessionStorage.getItem("panier") || '[]');
    this.productCmmd = {
      idProduct: this.product._id,
      qte: Number(qte)
    }
    panier.push(this.productCmmd)

    sessionStorage.setItem("panier", JSON.stringify(panier));
    console.log("panier", panier);

  }

  addComment(text:String){
    this.cService.addComment(text,this.id,this.headers).subscribe((res)=>{
      console.log('res comment',res);
      this.product.comments.push(res)
      
    })
  }

  reply(text:String,c:Comment){
    this.cService.reply(text,this.id,c._id,this.headers).subscribe((res)=>{
      console.log("res replly",res);
      c.replys.push(res)
    })
  }
}
