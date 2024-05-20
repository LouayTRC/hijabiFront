import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Role } from 'src/app/models/role';
import { AuthService } from 'src/app/services/auth.service';
import { RoleService } from 'src/app/services/role.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm!:FormGroup
  roles!:Role[]
  file!:File
  erreur=""
  constructor(private rservice:RoleService,private fb:FormBuilder,private authService:AuthService,private fireStorage:AngularFireStorage,private router:Router) { }

  ngOnInit(): void {
    this.signupForm=this.fb.group({
      username:[''],
      fullname:[''],
      email:[''],
      password:[''],
      role:[''],
      pdp:['']
    })


    this.rservice.getRoles().subscribe((res)=>{
      console.log("res",res);
      
      this.roles=res
    })

  }

  async signup(){
    
    if (this.file) {
      this.signupForm.value.pdp= await this.uploadPic(this.file);
      
    } 
    else {
      this.signupForm.value.pdp="assets/images/new.png"
    }
    console.log("form",this.signupForm.value);
    this.authService.signup(this.signupForm.value).subscribe((res)=>{
      console.log("res sign",res);
      this.router.navigate(['/login'])
    },
    (error) => {
      this.erreur=error.error.message
     
    })
  }

  onFileChange(event:any){
    this.file=event.target.files[0];
    console.log("dd",this.file);
  }
  async uploadPic(f:File){
    const path=`users/${this.file.name}`
    const upload=await this.fireStorage.upload(path,this.file)
    const url=await upload.ref.getDownloadURL()
    return url;    
  }
}
