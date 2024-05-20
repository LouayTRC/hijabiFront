import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'hijabi';
  login:boolean=false
  constructor(private authService:AuthService){
    
    this.loadClient()

  }



  async loadClient(){
    const token=sessionStorage.getItem("Token")

    
    if (token) {
      
     await this.authService.verifyToken(token).toPromise().then((res)=>{
      console.log('vvv',res);
      
       
        if (res.login) {
         this.authService.setUser(res.data) 
         this.login=true
          
        }
        
      }).catch((error)=>{
        this.authService.logout()
        this.authService.setUser(undefined)
      })
      }
  }
}
