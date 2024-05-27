import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
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
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat'
import { AngularFireStorageModule } from '@angular/fire/compat/storage'
import { environment } from 'src/environments/environment';
import { UpdateProduitComponent } from './components/dashboard-vendeur/update-produit/update-produit.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    CategoriesComponent,
    ArticleComponent,
    SignupComponent,
    LoginComponent,
    NotFoundComponent,
    PanierComponent,
    DashboardVendeurComponent,
    OrdresComponent,
    ProduitsComponent,
    AjouterProduitsComponent,
    DashboardAdminComponent,
    UsersComponent,
    VendeursComponent,
    DemandeComponent,
    UpdateProduitComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
