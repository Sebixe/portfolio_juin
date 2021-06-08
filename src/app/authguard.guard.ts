import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthentificationService } from './shared/authentification/authentification.service';

@Injectable({
providedIn: 'root'
})

export class AuthguardGuard implements CanActivate {
constructor(private dataService: AuthentificationService,private router: Router ) {}

canActivate(
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot): boolean {
    const routeurl: string = state.url;
      return this.isLogin(routeurl);
  }

isLogin(routeurl: string) {         // Protection qui bloque l'accès aux pages de Login et d'ajout d'administrateur afin d'éviter qu'on puisse les atteindre en changeant l'adresse dans la barre de recherche
    if (this.dataService.isLoggedIn()) {
      return true;
    }
     this.dataService.redirectUrl = routeurl;
     this.router.navigate(['/authentification'], {queryParams: { returnUrl: routeurl }} );
  }
}
