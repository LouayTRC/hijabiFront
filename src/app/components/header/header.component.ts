import { HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user!: any
  categories!: Category[]
  @Input() l!: boolean
  headers!: HttpHeaders;
  constructor(private authService: AuthService, private cservice: CategoryService) { }

  ngOnInit(): void {
    this.authService.user.subscribe((user) => {
      this.user = user
      console.log( user )
      if (user) {
        const token = sessionStorage.getItem('Token')

        this.headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        });

        this.user=user
      }

      this.cservice.getCategories().subscribe((res) => {
        this.categories = res
      })
      
    })

  }
  logout() {
    this.authService.logout()
  }

}
