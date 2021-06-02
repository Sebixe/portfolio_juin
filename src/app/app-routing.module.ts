import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent} from './home/home.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { ContactComponent } from './contact/contact.component';
import { PresentationComponent } from './presentation/presentation.component';
import { ServicesComponent } from './services/services.component';
import { FooterComponent } from './footer/footer.component';
import { AuthguardGuard } from './authguard.guard';
import { RegisterComponent } from './register/register.component';
import {NavComponent} from './nav/nav.component';
import {AdminComponent} from './admin/admin.component';
import {AuthentificationComponent} from './authentification/authentification.component';


const routes: Routes = [
 {
     path: 'home',
    component: HomeComponent
  },
 {
     path: 'portfolio',
    component: PortfolioComponent
  },
 {
     path: 'presentation',
    component: PresentationComponent
  },
 {
     path: 'services',
    component: ServicesComponent
  },
 {
     path: 'contact',
    component: ContactComponent
  },
  {
     path: 'authentification',
     component: AuthentificationComponent
   },
  {
     path: 'registration',
     component: RegisterComponent, canActivate: [AuthguardGuard]
   },
  {
     path: 'nav',
     component: NavComponent
   },
  {
     path: 'admin',
     component: AdminComponent, canActivate: [AuthguardGuard]
   },
  {
     path: 'footer',
     component: FooterComponent
   },

  { path: '',   redirectTo: 'home', pathMatch: 'full' }, // redirect to `home`
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
