import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { ArticleComponent } from './components/article/article.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PanierComponent } from './components/panier/panier.component';
import { DashboardVendeurComponent } from './components/dashboard-vendeur/dashboard-vendeur.component';
import { OrdresComponent } from './components/dashboard-vendeur/ordres/ordres.component';
import { ProduitsComponent } from './components/dashboard-vendeur/produits/produits.component';
import { AjouterProduitsComponent } from './components/dashboard-vendeur/ajouter-produits/ajouter-produits.component';
import { DashboardAdminComponent } from './components/dashboard-admin/dashboard-admin.component';
import { UsersComponent } from './components/dashboard-admin/users/users.component';
import { VendeursComponent } from './components/dashboard-admin/vendeurs/vendeurs.component';
import { DemandeComponent } from './components/dashboard-admin/demande/demande.component';
import { adminGuard } from './guard/admin.guard';
import { vendeurGuard } from './guard/vendeur.guard';
import { UpdateProduitComponent } from './components/dashboard-vendeur/update-produit/update-produit.component';

const routes: Routes = [
  
  {path:'home',component:HomeComponent},

  {path:'categorie/:cat',component:CategoriesComponent},
  {path:'article/:id',component:ArticleComponent},
  {path:'signup',component:SignupComponent},
  {path:'login',component:LoginComponent},
  {path:'panier',component:PanierComponent},
  
  {path:'dashboard-vendeur',component:DashboardVendeurComponent,
  children : [
  {path:'' , component:OrdresComponent},              
  {path:'ordres' , component:OrdresComponent},
  {path:'produits' , component:ProduitsComponent},
  {path:'ajouterproduit' , component:AjouterProduitsComponent},
  {path:'modifierProduit/:id' , component:UpdateProduitComponent},
  ],canActivate:[vendeurGuard]},

  {path:'dashboard-admin',component:DashboardAdminComponent,
  children : [            
  {path:'users' , component:UsersComponent},
  {path:'vendeurs' , component:VendeursComponent},
  {path:'demandes' , component:DemandeComponent},
  {path:'' , redirectTo:'users',pathMatch:'full'},  
  ],canActivate:[adminGuard]},

  {path:'',redirectTo:'home',pathMatch:'full'},
  {path:'**',component:NotFoundComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'disabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
