import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { RoleService } from 'src/app/services/role.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!:FormGroup
  constructor(private fb:FormBuilder,private authService:AuthService,private rservice:RoleService,private route:Router) { }

  ngOnInit(): void {
    this.loginForm=this.fb.group({
      username:[''],
      password:['']
    })

  }
  erreur=""


  login(){
    this.authService.login(this.loginForm.value).subscribe(
      (res)=>{
      console.log("log",res);
      sessionStorage.setItem('Token',res.token)
      this.authService.setUser(res.user)
      this.rservice.getRoleById(res.user.role).subscribe(
        (res2)=>{
        console.log("res1111",res2);
        
        if (res2.name=='Admin') {
          this.route.navigate(['/dashboard-admin'])
        }
        else if (res2.name=='Vendeur') {
          this.route.navigate(['/dashboard-vendeur'])
        }
        else{
          this.route.navigate(['/home'])
        }
      },
     
    )

    },
    (error) => {
       this.erreur=error.error.message
      
  }
  )
  }
}
