import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from  '../shared/authentification/authentification.service';

import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  loginbtn : boolean;
  logoutbtn : boolean;

constructor(private cookieService: CookieService, private dataService: AuthentificationService) {
  dataService.getLoggedInName.subscribe(name => this.changeName(name));
    if(this.dataService.isLoggedIn()){                                             // C'est ici que s'affichent les boutons en fonction de si l'utilisateur est connecté ou non
        console.log("loggedin");
          this.loginbtn=false;
          this.logoutbtn=true
     }else{
           this.loginbtn=true;
           this.logoutbtn=false
}
}

 private changeName(name: boolean): void {
    this.logoutbtn = name;
    this.loginbtn = !name;
 }

logout(){
      this.dataService.deleteToken();
      this.cookieService.delete('Login');                // Supprime le Token et le cookie de Login puis renvoie sur la page de Login
      window.location.href = window.location.href;
}
}
