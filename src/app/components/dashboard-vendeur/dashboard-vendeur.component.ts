import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard-vendeur',
  templateUrl: './dashboard-vendeur.component.html',
  styleUrls: ['./dashboard-vendeur.component.css']
})
export class DashboardVendeurComponent implements OnInit {

  constructor(private authService:AuthService) { }

  ngOnInit(): void {
  }
  logout(){
    this.authService.logout()
  }
}
